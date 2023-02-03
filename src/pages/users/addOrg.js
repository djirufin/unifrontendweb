/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import Controls from "../../components/controls/Controls";
import { Form, useForm } from "../../components/useForm";
import { Type } from "../../services/managementService";

const initialeValues = {
  name: "",
  type: "",
  loading: false,
};

export default function AddOrg(props) {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("type" in fieldValues)
      temp.type = fieldValues.type ? "" : "This field is required.";
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
    if (validate()) {
      values.loading = true;
      addOrEdit(values, resetForm);
    }
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Input
            name="name"
            label="Organisation Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Select
            label="Organisation Type"
            name="type"
            value={values.type}
            onChange={handleInputChange}
            options={Type()}
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
