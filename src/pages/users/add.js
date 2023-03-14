/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useForm, Form } from "../../components/useForm";
import {
  FormControl,
  Grid,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import * as userService from "../../services/userService";
import * as manageService from "../../services/managementService";
import { useState } from "react";
import { generate } from "@wcj/generate-password";
import { sendEmail } from "../../services/emailService";

const initialeValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  email: "",
  telephone: "",
  autorisation: "",
  organisation_id: "",
  loading: false,
};

export default function AddUserForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [options, setOptions] = useState([]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstname" in fieldValues)
      temp.firstname = fieldValues.firstname ? "" : "This field is required.";
    if ("lastname" in fieldValues)
      temp.lastname = fieldValues.lastname ? "" : "This field is required.";
    if ("username" in fieldValues)
      temp.username =
        fieldValues.username.length > 3 ? "" : "Minimum 4 caracters required.";
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "Email is not valid.";
    if ("telephone" in fieldValues)
      temp.telephone = fieldValues.telephone ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      values.loading = true;
      values.password = generate();
      addOrEdit(values, resetForm);

      sendEmail(
        values.email,
        "Création utilisateur",
        "Votre compte a ete cree dans la plateform trackiteum.org, veuillez y acceder en utilisant\nUsername : " +
          values.username +
          "\nPassword : " +
          values.password
      );
    }
  };

  const getOrgByType = () => {
    manageService.getOrganisation().then((res) => {
      setOptions(res.data);
    });
  };

  useEffect(() => {
    getOrgByType();
  }, []);

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialeValues, true, validate);

  useEffect(() => {
    if (recordForEdit !== null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  const organisation = [
    options
      .filter((r) => r.name !== "Undefined")
      .map((org) => {
        return {
          id: org.id,
          title: org.name,
        };
      }),
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="firstname"
            label="First Name"
            value={values.firstname}
            onChange={handleInputChange}
            error={errors.firstname}
          />
          <Controls.Input
            label="Last Name"
            name="lastname"
            value={values.lastname}
            onChange={handleInputChange}
            error={errors.lastname}
          />
          <Controls.Input
            label="Username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            error={errors.username}
          />
          <Controls.Select
            label="Role"
            name="autorisation"
            value={values.autorisation}
            onChange={handleInputChange}
            options={userService.Role()}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Telephone"
            name="telephone"
            value={values.telephone}
            onChange={handleInputChange}
            error={errors.telephone}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Select
            label="Organisation"
            name="organisation_id"
            value={values.organisation_id}
            onChange={handleInputChange}
            options={organisation[0]}
          />
          <div>
            <Controls.Button
              type="submit"
              text={values.loading ? <CircularProgress /> : "VALIDATE"}
              disabled={values.loading}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
