/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Grid, IconButton, InputAdornment, Paper } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useFormL, Form } from "../../components/useFormL";
import { CircularProgress } from "@material-ui/core";
import * as authService from "../../services/authService";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const initialValues = {
  username: "",
  password: "",
  loading: false,
  message: "",
  checkedB: false,
};

export default function Login(props) {
  //const { addOrEdit, recordForEdit } = props
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
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
      authService
        .login(values.username, values.password)
        .then(() => {
          props.history.push("/dashboard");

          window.location.reload();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log("401", error.code);
            setErrorMessage("BAD CREDENTIALS");
            setValues((values.message = "test"), (values.loading = false));
          } else {
            console.log("401 TEST");
            setErrorMessage("");
          }
        });
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormL(initialValues, true, validate);

  const gridStyle = { margin: "0px" };
  const img = {
    position: "center",
    padding: "0px",
    height: "12vh",
    margin: "0rem",
  };
  const paperStyle = {
    padding: "0px",
    height: "8vh",
    margin: "0rem",
    color: "red",
  };
  const btnstyle = { margin: "8px 0" };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Uc2NEf">
      <Form className="cover" onSubmit={handleSubmit}>
        <Grid>
          <Grid align="center">
            <img style={img} src="logoUni.jpg" alt="" />
            <h2>LOGIN IN</h2>
          </Grid>
          <br />
          {errorMessage && (
            <div align="center" style={paperStyle}>
              {errorMessage}
            </div>
          )}
          <Controls.textField
            placeholder="Username"
            name="username"
            className="input"
            fullWidth
            onChange={handleInputChange}
            value={values.username}
            error={errors.username}
          />
          <br />
          <br />
          <Controls.textField
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            fullWidth
            onChange={handleInputChange}
            value={values.password}
            error={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          <br />
          <Controls.Checkbox
            name="checkedB"
            label="Remember"
            checked={values.checkedB}
            onChange={handleInputChange}
            value={values.checkedB}
            ref={(c) => {
              values.checkedB = c;
            }}
          />
          <br />
          <br />
          <div style={btnstyle}>
            <Controls.Button
              type="submit"
              variant="contained"
              text={values.loading ? <CircularProgress /> : "Login In"}
              disabled={values.loading}
              fullWidth
            />
          </div>
        </Grid>
      </Form>
    </div>
  );
}
