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
} from "@material-ui/core";
import * as logisticService from "../../services/logisticService";
import * as manageService from "../../services/managementService";
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

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(0.4),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "50%",
    left: "0rem",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "release_order", label: "Release Order" },
  { id: "waybill", label: "Waybill Number" },
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
  { id: "release_order", title: "Release Order" },
];

const logisticTypeSelect2 = [
  { id: "purchase_order", title: "Purchase Order" },
  { id: "sales_order", title: "Sales Order" },
];

export default function NewOrder() {
  const classes = useStyles();

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });
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
  const [selectedOption2, setSelectedOption2] = useState("purchase_order");
  const [logisticType, setLogisticType] = useState("zrost");
  const [openPopup, setOpenPopup] = useState(false);
  const [ccOption, setCcOption] = useState([]);
  const [ccList, setCcList] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    logisticService
      .searchMaterial(selectedOption, searchText)
      .then((response) => {
        setResult(response.data);
        setStatut(1);
      });

    getOrgByType();
    getUserByOrg();
  };

  const getOrgByType = () => {
    manageService.getOrgByType("SUPPLIER").then((res) => {
      setOrgByType(res.data);
    });
  };

  const getUserByOrg = () => {
    listUsersByOrg("63bec6e363e587e178ff1c27").then((res) => {
      setCcList(res.data);
    });
  };

  const handleOrgChange = (e) => {
    setSelectOrganisation(e.target.value);
    setOrganisationName(e.target.options[e.target.selectedIndex].text);
    getEmployeeByType(e.target.value);
    //if result > 0, load consignee spoc
    getPointOfContact(result[0]["Consignee"]);
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

  const processTransfer = () => {
    setMessageTransferStatus("Transfert en cours... ");
    //Update pickstatus
    logisticService.transferMaterial(
      logisticType,
      result[0]["Waybill Number"],
      organisationName,
      driver,
      ipSpoc,
      mlleVehicule,
      phoneDriver
    );
    //send email
    sendEmail(
      receiverEmail,
      "Transfer UNICEF",
      "Ceci est un TEST priere ne pas le considerer. Vous allez recevoir des dons de UNICEF. Le waybill est " +
        <strong>{result[0]["Waybill Number"]}</strong>,
      ccOption
    );
    //set message to display
    setMessageTransferStatus(
      "Transfert effectuee... un email a bien ete envoye"
    );
  };

  /*useEffect(() => {
    getOrgByType();
  }, []);*/

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(result, headCells, filterFn);

  const changeLogisticType = (e) => {
    setLogisticType(e.target.value);
  };

  const handletInput = (e) => {
    setSearchText(e.target.value);
  };

  const onChangeSearch = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleItem = (item) => {
    var array = [];
    item.map((i) => array.push(i.value));
    setCcOption(array);
    console.log(array);
  };

  const test1 = [
    ccList.map((type, index) => {
      return {
        value: type.email,
        label: type.firstname + " " + type.lastname,
      };
    }),
  ];

  return (
    <>
      <Header />
      <Paper className={classes.pageContent}>
        <Toolbar>
          {statut === 1 ? (
            result.length === 0 ? (
              <h3 style={{ color: "red" }}>
                Nous avons rien pu trouver, veuillez refraichir votre base en
                cliquant sur
                <Forward fontSize="small" />
              </h3>
            ) : null
          ) : null}
          <Controls.Button
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
                onChange={changeLogisticType}
                options={listType}
              />
              <Controls.Input
                label="Search"
                name="searchText"
                onChange={handletInput}
                value={searchText}
                className={classes.searchInput}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Select
                value={
                  logisticType === "zrost" ? selectedOption : selectedOption2
                }
                onChange={onChangeSearch}
                options={
                  logisticType === "zrost"
                    ? logisticTypeSelect
                    : logisticTypeSelect2
                }
              />
              <Controls.Button text="Submit" type="submit" />
            </Grid>
          </Grid>
        </Form>
        <Popup
          title="Refresh Base"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <RefreshBase recordForEdit={recordForEdit} />
        </Popup>
      </Paper>
      {result.length > 0 ? (
        <Paper className={classes.pageContent}>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user["Release Order Number"]}</TableCell>
                  <TableCell>{user["Waybill Number"]}</TableCell>
                  <TableCell>{user["Material"]}</TableCell>
                  <TableCell>{user["Material Description"]}</TableCell>
                  <TableCell>{user["RO Quantity"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <p>
            Authorized person :{" "}
            <strong>{result[0]["Authorized Person"]}</strong>
          </p>
          <p>
            <Select
              placeholder="Cc"
              className={classes.searchInput}
              isMulti
              options={test1[0]}
              onChange={(item) => {
                handleItem(item);
              }}
            />
          </p>
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
                IP : <strong>{result[0]["Consignee Name"]}</strong>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <select
                  onChange={(e) => {
                    setIpSpoc(e.target.options[e.target.selectedIndex].text);
                    setReceiverEmail(
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
                  text="Transferer"
                  variant="outlined"
                  onClick={() => {
                    processTransfer();
                  }}
                />{" "}
                {messageTransferStatus}
              </p>
            </>
          )}
        </Paper>
      ) : null}
    </>
  );
}
