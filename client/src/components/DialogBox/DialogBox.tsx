import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import DropDown from "../dropDown/DropDown";
import Textarea from "@mui/joy/Textarea";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogBox() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{
          bgcolor: "#153b6b",
          color: "white",
        }}
        onClick={handleClickOpen}
      >
        CREATE
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Question
        </DialogTitle>
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "30px",
              }}
            >
              <DropDown />
              <TextField placeholder="Abbreviation" />
            </Box>
            <Textarea
              minRows={2}
              maxRows={50}
              sx={{
                width: "350px",
              }}
              placeholder="Question"
            />
          </Box>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box></Box>
          <Box>
            <Button autoFocus onClick={handleClose}>
              cancel
            </Button>
            <Button autoFocus onClick={handleClose}>
              create
            </Button>
          </Box>
        </Box>
      </BootstrapDialog>
    </React.Fragment>
  );
}
