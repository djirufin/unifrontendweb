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
  role: "",
  organisation_id: "",
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
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      values.password = generate();
      values.telephone = "test";
      addOrEdit(values, resetForm);
      sendEmail(
        values.email,
        "User creation",
        "CECI EST UN TEST-MRBON, PRIERE NE PAS LE CONSIDERER. \n Votre compte a ete cree dans la plateform trackiteum.org, veuillez y acceder en utilisant le username " +
          values.username +
          " et le password " +
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
          <Controls.Select
            label="Role"
            name="role"
            value={values.role}
            onChange={handleInputChange}
            options={userService.Role()}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            error={errors.username}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <FormControl variant="outlined">
            <InputLabel>{"Organisation"}</InputLabel>
            <MuiSelect
              label="Organisation"
              name="organisation_id"
              value={values.organisation_id}
              onChange={handleInputChange}
            >
              {options
                .filter((i) => i.name !== "Undefined")
                .map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </MuiSelect>
          </FormControl>
          <div>
            <Controls.Button type="submit" text="Validate" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
