/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import { CircularProgress, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../../components/controls/Controls";
import Select from "react-select";
import { Form, useForm } from "../../components/useForm";
import { activity, sendEmail, supplier } from "../../services/emailService";
import SupplierData from "./supplierData";
import Notification from "../../components/Notification";
import SuccessDialog from "../../components/successDialog";

const useStyles = makeStyles((theme) => ({
  page: {
    padding: "2em",
    height: "90vh",
    width: "80em",
    display: "inline-block",
    justifyContent: "space-around",
  },
  pageContent: {
    width: "69em",
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "20em",
  },
  newButton: {
    position: "absolute",
    right: "21em",
  },
}));

const initialeValues = {
  email: "",
  companyName: "",
  acronym: "",
  unicef: false,
  un: false,
  ngo: false,
  address: "",
  city: "",
  activitySector: [],
  fichier: "",
  telephone1: "",
  telephone2: "",
  focalPoint: "",
  loading: false,
};

export default function Supplier(props) {
  const classes = useStyles();
  const [sector, setSector] = useState([]);
  const [file, setFile] = useState([]);
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

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "Email is not valid.";
    if ("companyName" in fieldValues)
      temp.companyName = fieldValues.companyName
        ? ""
        : "This field is required.";
    if ("acronym" in fieldValues)
      temp.acronym = fieldValues.acronym ? "" : "This field is required";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "This field is required";
    if ("telephone1" in fieldValues)
      temp.telephone1 = fieldValues.telephone1 ? "" : "This field is required";
    if ("focalPoint" in fieldValues)
      temp.focalPoint = fieldValues.focalPoint ? "" : "This field is required";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialeValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      values.loading = true;
      //upload file
      //   let data = new FormData();
      //   data.append("file", file);
      //   values.fichier = data;

      values.activitySector = sector;
      supplier(values)
        .then((res) => {
          console.log(res.data);
          setConfirmDialog({
            isOpen: true,
            title: res.data,
            subTitle: "Um e-mail foi enviado para você",
          });
          sendEmail(
            values.email,
            "PEDIDO DE MANIFESTAÇÕES DE INTERESSE - UNICEF",
            "O seu registo foi submetido com sucesso !"
          );
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          setNotify({
            isOpen: true,
            message: err.message,
            type: "error",
          });
        });
    }
  };

  const activityItem = (item) => {
    var array = [];
    item.map((i) => array.push(i.value));
    setSector(array);
  };

  return (
    <div style={{ backgroundColor: "rgb(217, 243, 253)" }}>
      <div className="Uc2NEf">
        <div class="vnFTpb teQAzf ErmvL KHCwJ"></div>
        <form onSubmit={handleSubmit}>
          <div className="text">
            <div style={{}}>
              <div
                style={{
                  backgroundColor: "rgb(0, 174, 239)",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  height: "12px",
                  left: "-1px",
                  top: "-1px",
                  width: "calc(100% + 0px)",
                }}
              ></div>
              <div style={{ padding: "1em" }}>
                <SupplierData />
              </div>
            </div>
          </div>
          <div className="forms">
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                E-MAIL <strong style={{ color: "red" }}>*</strong>{" "}
              </p>
              <br />
              <Controls.textField
                className={classes.searchInput}
                placeholder="Your response"
                name="email"
                onChange={handleInputChange}
                value={values.email}
                error={errors.email}
              />
            </div>
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                COMPANY NAME <strong style={{ color: "red" }}>*</strong> <br />
                Company Name - Type in capital letters
              </p>
              <br />
              <Controls.textField
                className={classes.searchInput}
                placeholder="Your response"
                name="companyName"
                onChange={handleInputChange}
                value={values.companyName}
                error={errors.companyName}
              />
            </div>
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                ACRONYM <strong style={{ color: "red" }}>*</strong>
              </p>
              <br />
              <Controls.textField
                className={classes.searchInput}
                placeholder="Your response"
                name="acronym"
                onChange={handleInputChange}
                value={values.acronym}
                error={errors.acronym}
              />
            </div>
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                UN/NGO EXPERIENCE <strong style={{ color: "red" }}>*</strong>
              </p>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Controls.Checkbox
                  checked={values.unicef}
                  onChange={handleInputChange}
                  value={values.unicef}
                  name="unicef"
                  label="UNICEF"
                />
                <Controls.Checkbox
                  checked={values.un}
                  onChange={handleInputChange}
                  value={values.un}
                  name="un"
                  label="UN"
                />
                <Controls.Checkbox
                  checked={values.ngo}
                  onChange={handleInputChange}
                  value={values.ngo}
                  name="ngo"
                  label="NGO"
                />
              </div>
            </div>
          </div>
          <div className="forms">
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                ADDRESS <strong style={{ color: "red" }}>*</strong>{" "}
              </p>
              <br />
              <Controls.textField
                className={classes.searchInput}
                placeholder="Your response"
                name="address"
                onChange={handleInputChange}
                value={values.address}
                error={errors.address}
              />
            </div>
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                CITY <strong style={{ color: "red" }}>*</strong>{" "}
              </p>
              <br />
              <Controls.textField
                className={classes.searchInput}
                placeholder="Your response"
                name="city"
                onChange={handleInputChange}
                value={values.city}
                error={errors.city}
              />
            </div>
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                ACTIVITY SECTOR <strong style={{ color: "red" }}>*</strong>{" "}
              </p>
              <br />
              <Select
                className={classes.searchInput}
                isMulti
                onChange={(item) => activityItem(item)}
                options={activity()}
              />
            </div>
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>ADD FILE </p>
              <br />
              <Controls.Input
                className={classes.searchInput}
                type="file"
                placeholder="Your response"
                name="ficher"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="forms">
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                PHONE 1 <strong style={{ color: "red" }}>*</strong>{" "}
              </p>
              <br />
              <Controls.textField
                className={classes.searchInput}
                placeholder="Ex: +245000000000"
                name="telephone1"
                onChange={handleInputChange}
                value={values.telephone1}
                error={errors.telephone1}
              />
            </div>
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>PHONE 2 </p>
              <br />
              <Controls.textField
                className={classes.searchInput}
                placeholder="Ex: +245000000000"
                name="telephone2"
                onChange={handleInputChange}
                value={values.telephone2}
              />
            </div>
            <div
              style={{
                padding: "1em",
              }}
            >
              <p>
                FOCAL POINT <strong style={{ color: "red" }}>*</strong>{" "}
              </p>
              <br />
              <Controls.textField
                className={classes.searchInput}
                placeholder="Your response"
                name="focalPoint"
                onChange={handleInputChange}
                value={values.focalPoint}
                error={errors.focalPoint}
              />
            </div>
          </div>
          <div>
            <Controls.Button
              text={values.loading ? <CircularProgress /> : "SEND"}
              disabled={values.loading}
              type="submit"
            />
            <Controls.Button
              className={classes.newButton}
              text="RESET"
              color="default"
              disabled={values.loading}
              onClick={resetForm}
            />
          </div>
        </form>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
      <SuccessDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}
