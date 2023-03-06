import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { alertHideDuration } from "./constant";

interface ISnackbar {
  open: boolean;
  onClose: () => void;
  alertMessage: string;
  severity: "success" | "error" | "info" | "warning";
}

export const AlertSnackbar = (props: ISnackbar) => {
  const { open, onClose, alertMessage, severity } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={alertHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={onClose} severity={severity}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};
