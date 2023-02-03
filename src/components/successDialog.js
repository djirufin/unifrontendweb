import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import Controls from "./controls/Controls";
import { CheckCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: "#C3F7E6",
    color: "#43B692",
    "&:hover": {
      backgroundColor: "#C3F7E6",
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "7rem",
    },
  },
}));

export default function SuccessDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  return (
    <div>
      <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
        <DialogTitle className={classes.dialogTitle}>
          <IconButton disableRipple className={classes.titleIcon}>
            <CheckCircle />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6">{confirmDialog.title}</Typography>
          <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Controls.Button
            text="Close"
            color="default"
            onClick={() => {
              window.location.reload();
              setConfirmDialog({ ...confirmDialog, isOpen: false });
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
