/* eslint-disable no-unused-vars */
import {
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import { format } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import Controls from "../../components/controls/Controls";
import Header from "../../components/Header";
import useTable from "../../components/useTable";
import { eumList } from "../../services/monitoringService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "30%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
    top: 10,
  },
}));

const headCells = [
  { id: "nameSite", label: "Site Name" },
  { id: "officeOrSection", label: "Office / Section" },
  { id: "dateOfFieldVisit", label: "Date of field visit" },
  { id: "geoLocation", label: "Geo Location", disableSorting: true },
];

const header = [
  { key: "nameSite", label: "Site name" },
  { key: "officeOrSection", label: "Office / Section" },
  { key: "dateOfFieldVisit", label: "Date of field visit" },
  { key: "regionSite", label: "Region site" },
  { key: "localitySite", label: "Locality site" },
  { key: "partnerOfActivity", label: "Partner of the activity" },
  { key: "telephoneIP", label: "IP phone" },
  { key: "emailIP", label: "IP email" },
  { key: "personsMet", label: "Persons met" },
  { key: "geoLocation", label: "Geo Location" },
  { key: "purposeOfVisit", label: "Purpose of visit" },
  { key: "outputDescription", label: "Output(s) description" },
  { key: "activityDescription", label: "Activity description" },
  {
    key: "referenceProgrammeDocument",
    label: "Programme Document name/Reference #",
  },
  { key: "dateOfReporting", label: "Date of reporting" },
  { key: "staffResponsible", label: "Section/Staff responsible" },
  { key: "requiredAction", label: "Required action" },
  { key: "statusImplementation", label: "Status of implementation" },
  { key: "dateSuppliesDelivered", label: "Date supplies delivered" },
  { key: "descriptionOfSupplyItem", label: "Description of supply item" },
  { key: "purchaseRequisition", label: "Purchase Requisition/Sales Order#" },
  {
    key: "purchaseRequisitionQty",
    label: "Purchase Requisition/Sales Order Qty",
  },
  { key: "consignmentNote", label: "Consignment Note#" },
  { key: "poQty", label: "PO Qty" },
  { key: "shippedQty", label: "Shipped Qty" },
  { key: "deliveredQty", label: "Delivered Qty" },
  { key: "warehouseQty", label: "Warehouse Qty" },
  { key: "storageCondition", label: "Warehouse/Storage condition" },
  { key: "commentStorageCondition", label: "Comments" },
  { key: "inventoryRecords", label: "Inventory records" },
  { key: "commentInventoryRecords", label: "Comments" },
  { key: "storeReceiptVoucher", label: "Store receipt voucher" },
  { key: "commentStoreReceipt", label: "Comments" },
  { key: "storeIssueVoucher", label: "Store issue voucher" },
  { key: "commentStoreIssue", label: "Comments" },
  { key: "inventoryLedger", label: "Inventory Ledger" },
  { key: "inventoryLedger", label: "Comments" },
  {
    key: "issueApprovedByAuthorizedPerson",
    label: "Issues approved by authorized person",
  },
  { key: "commentAuthorizedPerson", label: "Comments" },
  {
    key: "dateItemsReceivedInGovt",
    label: "Date item received in Govt. / NGO store",
  },
  { key: "goodsReceiptSigned", label: "Goods receipt signed ?" },
  { key: "bywhomGR", label: "Signed by whom ?" },
  {
    key: "itemsIssuedToEndUsersWithin",
    label: "Items issued to end-users within 2-3 weeks ?",
  },
  { key: "commentItemsIssued", label: "Comments" },
];

function Regular(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (records) => {
      return records;
    },
  });

  const allEUM = () => {
    eumList().then((res) => {
      setRecords(res.data);
    });
  };
  useEffect(() => {
    allEUM();
  }, []);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  return (
    <div>
      <Header />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <CSVLink data={records} headers={header} filename={"my-file.csv"}>
            <Controls.Button
              text="Export"
              variant="outlined"
              startIcon={<GetApp />}
              className={classes.newButton}
            />
          </CSVLink>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((eum) => (
              <TableRow key={eum.id}>
                <TableCell>{eum.nameSite}</TableCell>
                <TableCell>{eum.officeOrSection}</TableCell>
                <TableCell>{eum.dateOfFieldVisit}</TableCell>
                <TableCell style={{ color: "blue" }}>
                  <a
                    href={"https://www.google.com/search?q=" + eum.geoLocation}
                  >
                    {eum.geoLocation}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </div>
  );
}

export default Regular;
