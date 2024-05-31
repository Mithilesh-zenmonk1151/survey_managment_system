import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Switch } from "@mui/material";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
  status: boolean;
}
  ``
const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  onAgree,
  status,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
      {status
            ? "Publish Survey"
            : "Unpublish Survey"} 
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {status
            ? "Are you sure you want to publish this survey?"
            : "Are you sure you want to unpublish this survey?"}        </DialogContentText>
        {/* <Switch checked={status} disabled /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <Button onClick={onAgree} autoFocus>
        {status
            ? " publish"
            : "unpublish"}


        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
