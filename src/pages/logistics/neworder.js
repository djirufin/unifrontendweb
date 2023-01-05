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
import { Form } from "../../components/useForm";
import { listUsersByOrg } from "../../services/userService";
import Popup from "../../components/Popup";
import { Forward } from "@material-ui/icons";
import RefreshBase from "./refreshBase";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(0.4),
    padding: theme.spacing(1),
  },
  searchInput: {
    left: "0rem",
  },
  newButton: {
      position: 'absolute',
      right: '10px'
  }
}));

const headCells = [
  { id: "release_order", label: "Release Order" },
  { id: "waybill", label: "Waybill Number" },
  { id: "material", label: "Material" },
  { id: "material_description", label: "Material Description" },
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
  const [selectOrganisation, setSelectOrganisation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [messageTransferStatus, setMessageTransferStatus] = useState("");
  const [result, setResult] = useState([]);
  const [statut, setStatut] = useState(0);
  const [selectedOption, setSelectedOption] = useState("waybill");
  const [selectedOption2, setSelectedOption2] = useState("purchase_order");
  const [logisticType, setLogisticType] = useState("zrost");
  const [openPopup, setOpenPopup] = useState(false);

  const handleSearchChange = (e) => {
    e.preventDefault();
    logisticService
      .searchMaterial(selectedOption, searchText)
      .then((response) => {
        setResult(response.data);
        setStatut(1);
      });
  };

  const getOrgByType = () => {
    manageService.getOrgByType("SUPPLIER").then((res) => {
      setOrgByType(res.data);
    });
  };

  const handleOrgChange = (e) => {
    setSelectOrganisation(e.target.value);
    getEmployeeByType(e.target.value);
  };

  const getEmployeeByType = (id) => {
    listUsersByOrg(id)
      .then((response) => {
        console.log(response.data);
        setUserByOrg(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrgByType();
  }, []);


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
  console.log("SUPPLIER", orgByType);
  return (
    <>
      <Header />
      <Paper className={classes.pageContent}>
        <Toolbar>
                {(statut === 1 && result.length === 0) ?
                    (<h3 style={{color:"red"}}>Nous avons rien pu trouver, veuillez 
                        refraichir votre base en cliquant sur 
                        <Forward fontSize='small' /> 
                    </h3>) : null
                }
            <Controls.Button
                text="RefreshBase"
                variant="outlined"
                className={classes.newButton}
                onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
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
            <RefreshBase
                recordForEdit={recordForEdit} />
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
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <div>
            <p>
                Authorized person :{" "}
                <strong>{result[0]["Authorized Person"]}</strong>
            </p>
            <p>
                IP : <strong>{result[0]["Consignee Name"]}</strong>
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
            {selectOrganisation !== "" && (
                <>
                <p>
                    Select driver{" "}
                    <select>
                    {userByOrg.map((user, index) => (
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
                        setMessageTransferStatus(
                        "Transfert en cours... un email sera bien envoyee"
                        );
                    }}
                    />{" "}
                    {messageTransferStatus}
                </p>
                </>
            )}
          </div>
        </Paper>
      ) : null}
    </>
  );
}
