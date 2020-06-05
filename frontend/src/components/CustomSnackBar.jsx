import React from "react";
import { Snackbar } from "@material-ui/core";

const CustomSnackBar = ({ open, handleClose, message }) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right"
    }}
    open={open}
    autoHideDuration={2000}
    onClose={handleClose}
    message={message}
  />
);

export default CustomSnackBar;
