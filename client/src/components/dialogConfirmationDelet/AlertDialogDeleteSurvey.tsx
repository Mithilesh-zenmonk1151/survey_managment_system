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
  status?: boolean;
  modelHeading?:string;
  modelBody?:string;
}
  ``
const AlertDialogConfirmationDeleteSurvey: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  onAgree,
  status,
  modelHeading,
  modelBody
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
       {modelHeading}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modelBody}     </DialogContentText>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}  sx={{
            color:"black"
        }}>cancel</Button>
        <Button onClick={onAgree} autoFocus>
       Delete


        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialogConfirmationDeleteSurvey;
