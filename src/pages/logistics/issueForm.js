/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Grid } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import Controls from "../../components/controls/Controls";
import { Form, useForm } from "../../components/useForm";

const initialeValues = {
  "Consignee Name": "",
  Batch: "",
  senderName: "",
  receiverName: "",
  material_description: "",
  "RO Quantity": "",
  qtyReport: "",
};

export default function IssueForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const handleSubmit = (e) => {
    if (validate()) {
      addOrEdit(values, resetForm);
    }
    e.preventDefault();
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("Consignee Name" in fieldValues)
      temp["Consignee Name"] = fieldValues["Consignee Name"]
        ? ""
        : "This field is required.";
    if ("Batch" in fieldValues)
      temp.Batch = fieldValues.Batch ? "" : "This field is required.";
    if ("senderName" in fieldValues)
      temp.senderName = fieldValues.senderName ? "" : "This field is required.";
    if ("receiverName" in fieldValues)
      temp.receiverName = fieldValues.receiverName ? "" : "Email is not valid.";
    if ("material_description" in fieldValues)
      temp.material_description = fieldValues.material_description
        ? ""
        : "Email is not valid.";
    if ("RO Quantity" in fieldValues)
      temp["RO Quantity"] = fieldValues["RO Quantity"]
        ? ""
        : "Email is not valid.";
    if ("qtyReport" in fieldValues)
      temp.qtyReport = fieldValues.qtyReport ? "" : "Email is not valid.";
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

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="Consignee Name"
            label="Reference"
            value={values["Consignee Name"]}
            onChange={handleInputChange}
            error={errors["Consignee Name"]}
          />
          <Controls.Input
            label="Batch Number"
            name="batch"
            value={values.Batch}
            onChange={handleInputChange}
            error={errors.Batch}
          />
          <Controls.Input
            label="Delivery Quantity"
            name="RO Quantity"
            value={values["RO Quantity"]}
            onChange={handleInputChange}
            error={errors["RO Quantity"]}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Sender"
            name="senderName"
            value={values.senderName}
            onChange={handleInputChange}
            error={errors.senderName}
          />
          <Controls.Input
            name="receiverName"
            label="Receiver"
            value={values.receiverName}
            onChange={handleInputChange}
            error={errors.receiverName}
          />
          <Controls.Input
            name="qtyReport"
            label="Report Quantity"
            value={values.qtyReport}
            onChange={handleInputChange}
            error={errors.qtyReport}
          />
          <div>
            <Controls.Button text="Close" color="default" onClick={resetForm} />
            <Controls.Button type="submit" text="Confirmar" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
