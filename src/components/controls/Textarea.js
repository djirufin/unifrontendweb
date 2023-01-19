import React from "react";
import { TextareaAutosize } from "@material-ui/core";

export default function Textarea(props) {
  const {
    name,
    label,
    placeholder,
    value,
    error = null,
    onChange,
    ...other
  } = props;
  return (
    <TextareaAutosize
      aria-label={label}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
