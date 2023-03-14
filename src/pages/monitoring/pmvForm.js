/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Controls from "../../components/controls/Controls";
import { Form, useForm } from "../../components/useForm";
import { getCurrentUser } from "../../services/authService";

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

const initialeValues = {
  officeLocation: "",
  staffName: "",
  designationOrTitle: "",
  taNumber: "",
  pmvDateOfTravel: new Date(),
  email: "",
  telephone: "",
  initialName: "",
  dateByTraveller: new Date(),
  commentBySupervisor: "",
  recommendationType: "",
  recommendationText: "",
  recommendationUser: [],
};

export default function PmvForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [load, setLoad] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("officeLocation" in fieldValues)
      temp.officeLocation = fieldValues.officeLocation
        ? ""
        : "This field is required.";
    if ("staffName" in fieldValues)
      temp.staffName = fieldValues.staffName ? "" : "This field is required.";
    if ("designationOrTitle" in fieldValues)
      temp.designationOrTitle = fieldValues.designationOrTitle
        ? ""
        : "Minimum 4 caracters required.";
    if ("taNumber" in fieldValues)
      temp.taNumber = fieldValues.taNumber ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "Email is not valid.";
    if ("telephone" in fieldValues)
      temp.telephone = fieldValues.telephone ? "" : "This field is required.";
    if ("initialName" in fieldValues)
      temp.initialName = fieldValues.initialName
        ? ""
        : "This field is required.";
    if ("commentBySupervisor" in fieldValues)
      temp.commentBySupervisor = fieldValues.commentBySupervisor
        ? ""
        : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialeValues, true, validate);

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoad(true);
      addOrEdit(values, resetForm);
      // sendEmail(
      //   values.email,
      //   "User creation",
      //   "Votre compte a ete cree dans la plateform trackiteum.org, veuillez y acceder en utilisant\nUsername : " +
      //     values.username +
      //     "\nPassword : " +
      //     values.password
      // );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              label="Office Location"
              name="officeLocation"
              value={values.officeLocation}
              onChange={handleInputChange}
              error={errors.officeLocation}
            />
            <Controls.Input
              label="Designation or Title"
              name="designationOrTitle"
              value={values.designationOrTitle}
              onChange={handleInputChange}
              error={errors.designationOrTitle}
            />
            <Controls.DatePicker
              label="PMV Date of Travel"
              name="pmvDateOfTravel"
              value={values.pmvDateOfTravel}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Telephone Number"
              name="telephone"
              value={values.telephone}
              onChange={handleInputChange}
              error={errors.telephone}
            />
            <Controls.DatePicker
              label="Date by Traveller"
              name="dateByTraveller"
              value={values.dateByTraveller}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Recommended Type"
              name="recommendationType"
              value={values.recommendationType}
              onChange={handleInputChange}
              error={errors.recommendationType}
            />
            <Controls.Input
              label="Recommended Action"
              name="recommendationText"
              value={values.recommendationText}
              onChange={handleInputChange}
              error={errors.recommendationText}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              label="Staff Name"
              name="staffName"
              value={values.staffName}
              onChange={handleInputChange}
              error={errors.staffName}
            />
            <Controls.Input
              label="TA Number"
              name="taNumber"
              value={values.taNumber}
              onChange={handleInputChange}
              error={errors.taNumber}
            />
            <Controls.Input
              label="Email Adresse"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              label="Name Initials"
              name="initialName"
              value={values.initialName}
              onChange={handleInputChange}
              error={errors.initialName}
            />
            <Controls.Input
              label="Comment by Supervisor"
              name="commentBySupervisor"
              value={values.commentBySupervisor}
              onChange={handleInputChange}
              error={errors.commentBySupervisor}
            />
            <Controls.Input
              label="By Whom"
              name="recommendationUser"
              value={values.recommendationUser}
              onChange={handleInputChange}
              error={errors.recommendationUser}
            />
            <Controls.Button
              text={load ? <CircularProgress /> : "Validate"}
              disabled={load}
              type="submit"
            />
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
