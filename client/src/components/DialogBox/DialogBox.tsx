import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField } from "@mui/material";
import DropDown from "../dropDown/DropDown";
import Textarea from "@mui/joy/Textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question_type } from "@/slice/question_type/question_type_action";
import { create_question } from "@/slice/question/question_action";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type QuestionType = {
  response: Array<{ uuid: string; id: string; name: string; abb: string }>;

};

export default function DialogBox() {
  const [open, setOpen] = useState(false);
  const [selected_question_type_id, set_selected_question_type_id] = useState("");
  const [description,set_description]=useState("");
  const [abbr,set_abbr]=useState("");
  const [questionTypeList, setQuestionTypeList] = useState<QuestionType[]>([]);
  console.log("SEEEEEELLLECTTTEDDD___TYYYPPEE++",selected_question_type_id);
  console.log("Type of selected value",typeof(selected_question_type_id))
  const question_type_id= parseInt(selected_question_type_id);
  const dispatch= useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const active=false;
 const question={description,abbr,active,question_type_id};

  const handleClose = () => {
    setOpen(false);
    try{
      dispatch(create_question(question));


    }
    catch(error){
      console.log(error);
      console.log("Error comes in main folder while you are going to add question")
    }
  };


  useEffect(() => {
    dispatch(get_question_type())
  }, [dispatch]);

  const question_type= useAppSelector((state) => state.question_type?.content.response);
  console.log("states======Question_type", question_type);

 

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
          <IconButton
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
              
             
                <DropDown
                  select_type="Question Type"
                  options={question_type}
                  value={selected_question_type_id}
                  onChange={set_selected_question_type_id}
                />
              <TextField placeholder="Abbreviation" value={abbr} onChange={(e)=>set_abbr(e.target.value)}/>
            </Box>
            <Textarea
              minRows={2}
              maxRows={50}
              sx={{
                width: "350px",
              }}
              placeholder="Question"
              value={description}
              onChange={(e)=>set_description(e.target.value)}
            />
          </Box>
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box></Box>
          <Box>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button autoFocus onClick={handleClose}>
              Create
            </Button>
          </Box>
        </Box>
      </BootstrapDialog>
    </React.Fragment>
  );
}
