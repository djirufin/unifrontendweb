/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import * as logisticService from "../../services/logisticService";
import * as manageService from "../../services/managementService";
import * as authService from "../../services/authService";
import Controls from "../../components/controls/Controls";
import useTable from "../../components/useTable";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import { Form } from "../../components/useForm";
import { listUsersByOrg, UserById } from "../../services/userService";
import { sendEmail } from "../../services/emailService";
import { Forward } from "@material-ui/icons";
import RefreshBase from "./refreshBase";
import Select from "react-select";
import Notification from "../../components/Notification";
import SuccessDialog from "../../components/successDialog";
import RefreshBaseDdel from "./refreshBaseDdel";

const useStyles = makeStyles((theme) => ({
  Content: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "40%",
    left: "0rem",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "release_order", label: "Release Order / Sales" },
  { id: "waybill", label: "Waybill / Purchasing" },
  { id: "material", label: "Material" },
  { id: "material_description", label: "Material Description" },
  { id: "quantity", label: "RO Quantity" },
];

const listType = [
  { id: "zrost", title: "ZROST" },
  { id: "ddel", title: "DDEL" },
];

const logisticTypeSelect = [
  { id: "waybill", title: "WayBill" },
  { id: "release order", title: "Release Order" },
];

const logisticTypeSelect2 = [
  { id: "purchasing document", title: "Purchasing Document" },
  { id: "sales document", title: "Sales Document" },
];

export default function NewOrder() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });
  const [orgByIP, setOrgByIP] = useState([]);
  const [orgByType, setOrgByType] = useState([]);
  const [userByOrg, setUserByOrg] = useState([]);
  const [userByIP, setUserByIP] = useState([]);
  const [driver, setDriver] = useState("");
  const [phoneDriver, setPhoneDriver] = useState("");
  const [ipSpoc, setIpSpoc] = useState("");
  const [mlleVehicule, setMlleVehicule] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [selectOrganisation, setSelectOrganisation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [messageTransferStatus, setMessageTransferStatus] = useState("");
  const [result, setResult] = useState([]);
  const [statut, setStatut] = useState(0);
  const [selectedOption, setSelectedOption] = useState("waybill");
  const [selectedOption2, setSelectedOption2] = useState("purchasing document");
  const [logisticType, setLogisticType] = useState("zrost");
  const [openPopup, setOpenPopup] = useState(false);
  const [ccList, setCcList] = useState([]);
  const [ccListPr, setCcListPr] = useState([]);
  const [consignee, setConsignee] = useState("");
  const [consigneeName, setConsigneeName] = useState("");
  const [opList, setOpList] = useState([]);
  const [prList, setPrList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const handleSearchChange = (e) => {
    setLoad(true);
    e.preventDefault();
    if (logisticType === "zrost") {
      logisticService
        .searchZrost(selectedOption, searchText)
        .then((response) => {
          setResult(response.data);
          setStatut(1);
          setLoad(false);
        })
        .catch((e) => {
          console.log(`error ZROST ${e}`);
        });
    } else {
      logisticService
        .searchDdel(selectedOption2, searchText)
        .then((res) => {
          setResult(res.data);
          setStatut(1);
          setLoad(false);
        })
        .catch((e) => {
          console.log(`error DDEL ${e}`);
        });
    }

    getOrgByType();
    getUserOp();
    getUserPr();
    getOrgByIP();
  };

  const getOrgByType = () => {
    manageService.getOrgByType("SUPPLIER").then((res) => {
      setOrgByType(res.data);
    });
  };

  const getOrgByIP = () => {
    manageService.getOrgByType("IPARTNER").then((res) => {
      setOrgByIP(res.data);
    });
  };

  const handleOrgChange = (e) => {
    setSelectOrganisation(e.target.value);
    setOrganisationName(e.target.options[e.target.selectedIndex].text);
    getEmployeeByType(e.target.value);
    //if result > 0, load consignee spoc
    if (logisticType === "zrost") {
      getPointOfContact(result[0]["Consignee"]);
    }
  };

  const handleOrgDchange = (e) => {
    console.log(e.target.value);
    setConsignee(e.target.value);
    setConsigneeName(e.target.options[e.target.selectedIndex].text);
    getPointOfContact(e.target.value);
  };

  const getEmployeeByType = (id) => {
    listUsersByOrg(id)
      .then((response) => {
        setUserByOrg(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getPointOfContact = (id) => {
    listUsersByOrg(id)
      .then((response) => {
        setUserByIP(response.data);
      })
      .catch((err) => console.log(err));
  };

  //Process Transfer material (send Email)
  var arrayCcMail = [];
  const processTransfer = () => {
    setLoading(true);
    // user Cc
    arrayCcMail = [...opList, ...prList];
    console.log(arrayCcMail);
    var senderName = currentUser.firstname + " " + currentUser.lastname;
    var senderPhone = currentUser.telephone;
    var senderEmail = currentUser.email;
    setMessageTransferStatus("Transfer in progress... ");
    //Update pickstatus
    if (logisticType === "ddel") {
      logisticService
        .transferMaterial(
          logisticType,
          result[0]["Purchasing Document"],
          organisationName,
          driver,
          ipSpoc,
          mlleVehicule,
          phoneDriver,
          senderName,
          senderPhone,
          senderEmail,
          consignee,
          consigneeName
        )
        .then((res) => {
          console.log(res.data);
          //send email
          sendEmail(
            receiverEmail,
            "Transfer UNICEF",
            "Ceci est un TEST priere ne pas le considerer.\nVous allez recevoir des dons de UNICEF.\nLa reference pour la confirmation est " +
              result[0]["Purchasing Document"],
            arrayCcMail
          );
          //set message to display
          setMessageTransferStatus(
            "Successful transfer... An email has been sent"
          );

          setConfirmDialog({
            isOpen: true,
            title: "Successful transfer...",
            subTitle: "An email has been sent",
          });
          setLoading(false);
        });
    } else {
      logisticService
        .transferMaterial(
          logisticType,
          result[0]["Waybill Number"],
          organisationName,
          driver,
          ipSpoc,
          mlleVehicule,
          phoneDriver,
          senderName,
          senderPhone,
          senderEmail,
          "",
          ""
        )
        .then((res) => {
          console.log(res.data);
          //send email
          sendEmail(
            receiverEmail,
            "Transfer UNICEF",
            "Ceci est un TEST priere ne pas le considerer.\nVous allez recevoir des dons de UNICEF.\nLa reference pour la confirmation est " +
              result[0]["Waybill Number"],
            arrayCcMail
          );
          //set message to display
          setMessageTransferStatus(
            "Successful transfer... An email has been sent"
          );

          setConfirmDialog({
            isOpen: true,
            title: "Successful transfer...",
            subTitle: "An email has been sent",
          });
          setLoading(false);
        });
    }
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(result, headCells, filterFn);

  //Select all actors UNICEF
  const handleItem = (item) => {
    var array = [];
    item.map((i) => array.push(i.value));
    setOpList(array);
  };
  const handleItemPr = (item) => {
    var array = [];
    item.map((i) => array.push(i.value));
    setPrList(array);
  };

  //List all actors UNICEF
  const getUserOp = () => {
    listUsersByOrg("63bec6e363e587e178ff1c27").then((res) => {
      setCcList(res.data);
    });
  };
  const getUserPr = () => {
    listUsersByOrg("63bec6cb63e587e178ff1c26").then((res) => {
      setCcListPr(res.data);
    });
  };

  const operator = [
    ccList.map((type, index) => {
      return {
        value: type.email,
        label: type.firstname + " " + type.lastname,
      };
    }),
  ];
  const programme = [
    ccListPr.map((type, index) => {
      return {
        value: type.email,
        label: type.firstname + " " + type.lastname,
      };
    }),
  ];

  return (
    <>
      <Header />
      <Paper className={classes.Content}>
        <Toolbar>
          {statut === 1 ? (
            result.length === 0 ? (
              <h3 style={{ color: "red" }}>
                We couldn't find anything, please refresh your database by
                clicking
                <Forward fontSize="small" />
              </h3>
            ) : null
          ) : null}
          <Controls.Button
            size="small"
            text="RefreshBase"
            variant="outlined"
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <Form onSubmit={handleSearchChange}>
          <Grid container>
            <Grid item xs={6}>
              <Controls.Select
                value={logisticType}
                onChange={(e) => setLogisticType(e.target.value)}
                options={listType}
              />
              <Controls.Input
                label="Search"
                name="searchText"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                className={classes.searchInput}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Select
                size="small"
                value={
                  logisticType === "zrost" ? selectedOption : selectedOption2
                }
                onChange={(e) => setSelectedOption(e.target.value)}
                options={
                  logisticType === "zrost"
                    ? logisticTypeSelect
                    : logisticTypeSelect2
                }
              />
              <Controls.Button
                text={load ? <CircularProgress /> : "Search"}
                disabled={load}
                type="submit"
              />
            </Grid>
          </Grid>
        </Form>
        <Popup
          title="Refresh Base"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          {logisticType === "ddel" ? (
            <RefreshBaseDdel recordForEdit={recordForEdit} />
          ) : (
            <RefreshBase recordForEdit={recordForEdit} />
          )}
        </Popup>
      </Paper>
      {result.length > 0 ? (
        <Paper className={classes.Content}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {logisticType === "ddel"
                      ? user["Sales Document"]
                      : user["Release Order Number"]}
                  </TableCell>
                  <TableCell>
                    {logisticType === "ddel"
                      ? user["Purchasing Document"]
                      : user["Waybill Number"]}
                  </TableCell>
                  <TableCell>{user["Material"]}</TableCell>
                  <TableCell>{user["Material Description"]}</TableCell>
                  <TableCell>
                    {logisticType === "ddel"
                      ? user["Quantity"]
                      : user["RO Quantity"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
          <div>
            {logisticType === "ddel" ? (
              ""
            ) : (
              <>
                Authorized person :{" "}
                <strong>{result[0]["Authorized Person"]}</strong>
              </>
            )}
            <br />
            <br />
            <Grid container>
              <Select
                placeholder="Select Users Operation"
                className={classes.searchInput}
                isMulti
                options={operator[0]}
                onChange={(item) => {
                  handleItem(item);
                }}
              />
              &nbsp;&nbsp;&nbsp;
              <Select
                placeholder="Select Users Programme"
                className={classes.searchInput}
                isMulti
                options={programme[0]}
                onChange={(item) => {
                  handleItemPr(item);
                }}
              />
            </Grid>
            <br />
            Select Dispatching company :{" "}
            <select onChange={(e) => handleOrgChange(e)}>
              <option value="">Select supplier</option>
              {orgByType.map((type, index) => (
                <option value={type.id} key={index}>
                  {" "}
                  {type.name}{" "}
                </option>
              ))}
            </select>
            &nbsp;&nbsp;&nbsp;
            {selectOrganisation !== "" && (
              <>
                <select
                  onChange={(e) => {
                    setDriver(e.target.options[e.target.selectedIndex].text);
                    setPhoneDriver(
                      userByOrg[e.target.selectedIndex - 1]["email"]
                    );
                    console.log(
                      "email",
                      userByOrg[e.target.selectedIndex - 1]["email"],
                      e.target.selectedIndex,
                      phoneDriver
                    );
                  }}
                >
                  <option>Select driver</option>
                  {userByOrg.map((user, index) => (
                    <option id={user.id} key={index}>
                      {user.firstname + " " + user.lastname}
                    </option>
                  ))}
                </select>
                &nbsp;&nbsp;&nbsp;
                {driver !== "" && (
                  <input
                    name="phoneDriver"
                    type="text"
                    disabled
                    value={phoneDriver}
                  />
                )}
                &nbsp;&nbsp;&nbsp;
                <input
                  name="mlleVehicule"
                  onChange={(e) => {
                    setMlleVehicule(e.target.value);
                  }}
                  value={mlleVehicule}
                  placeholder="matricule vehicule"
                />
                <p>
                  IP :{" "}
                  {logisticType === "ddel" ? (
                    <>
                      <select
                        required={true}
                        onChange={(e) => handleOrgDchange(e)}
                      >
                        <option>Select Organisation</option>
                        {orgByIP.map((org, index) => (
                          <option value={org.id} key={index}>
                            {org.name}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <strong>{result[0]["Consignee Name"]}</strong>
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    required={true}
                    onChange={(e) => {
                      setIpSpoc(e.target.options[e.target.selectedIndex].text);
                      setReceiverEmail(
                        userByIP[e.target.selectedIndex - 1]["email"]
                      );
                      console.log(
                        userByIP[e.target.selectedIndex - 1]["email"]
                      );
                    }}
                  >
                    <option>Select Point of contact</option>
                    {userByIP.map((user, index) => (
                      <option id={user.id} key={index}>
                        {user.firstname + " " + user.lastname}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <Controls.Button
                    text={loading ? <CircularProgress /> : "TRANSFER"}
                    disabled={loading}
                    variant="outlined"
                    onClick={() => {
                      processTransfer();
                    }}
                  />{" "}
                  {messageTransferStatus}
                </p>
              </>
            )}
          </div>
        </Paper>
      ) : null}
      <Notification notify={notify} setNotify={setNotify} />
      <SuccessDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
