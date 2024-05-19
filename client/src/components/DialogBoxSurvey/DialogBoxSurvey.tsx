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
import { get_survey_type } from "@/slice/survey_type/survey_type_action";
import style from "@/app/ui/layout.module.css"
import { create_survey } from "@/slice/survey/survey_action";
import DropDownSurvey from "../dropDownSurvey/DropDownSurvey";
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

export default function DialogBoxSurvey() {
  const [open, setOpen] = useState(false);
  const [name,set_name]=useState("");
  const [selected_question_type_id, set_selected_question_type_id] =
    useState("");
    const [modality,set_selected_modality]=useState("");
    const [languages,set_language]= useState("");
  const [description, set_description] = useState("");
  const [abbr, set_abbr] = useState("");
  const [questionTypeList, setQuestionTypeList] = useState<QuestionType[]>([]);
  console.log("SEEEEEELLLECTTTEDDD___TYYYPPEE++", selected_question_type_id);
  console.log("Type of selected value", typeof selected_question_type_id);
  const survey_type_id = parseInt(selected_question_type_id);
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
//   const active = false;
  const is_published=false;
//   const question = { description, abbr, active, question_type_id };
  const options= {modality,languages};
  const survey= {name,is_published ,abbr,options,survey_type_id};
  console.log("Survey===",survey)


  const handleClose = () => {
    setOpen(false);
    try {
      dispatch(create_survey(survey))
      console.log("SURRRRRVVVVEEEYEYY=====",survey)
    } catch (error) {
      console.log(error);
      console.log(
        "Error comes in main folder while you are going to add question"
      );
    }
  };

  useEffect(() => {
    dispatch(get_survey_type());
  }, [dispatch]);
  

  const question_type = useAppSelector(
    (state) => state.survey_type?.content?.response
  );
  console.log("states======Survey_type", question_type);
  const modalityy=[
    {"id":"1",
    "name":"In Persion",
    "value":"In Persion"

    },{
        "id":"2",
        "name":"In Value",
    "value":"In Value"


    }
  ]
  const language =[
    {"id":"1",
    "name":"English",
    "value":"English"

    },{
        "id":"2",
        "name":"Spanish",
    "value":"Spanish"


    },
    ,{
        "id":"3",
        "name":"Chinese",
    "value":"Chinese"


    }
    ,{
        "id":"4",
        "name":"Italian",
    "value":"Italian"


    }
    ,{
        "id":"5",
        "name":"French",
    "value":"French"


    }
    ,{
        "id":"6",
        "name":"Portuguese(Portuguese)",
    "value":"Portuguese(Portuguese)"


    }
  ]
  
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
          Create Survey
          <IconButton
            aria-label="close"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleClose}
          ></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Box>
              {" "}
              <TextField
                label="Survey Name"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                value={name}
                onChange={(e)=>set_name(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "30px",
              }}
            >
              <TextField
                placeholder="Abbreviation"
                value={abbr}
                onChange={(e) => set_abbr(e.target.value)}
              />

              <DropDown
                select_type="Survey Type"
                options={question_type}
                value={selected_question_type_id}
                onChange={set_selected_question_type_id}
              />
            </Box>
            <Box sx={{
                display:"flex",
                gap:"20px"

            }}> 
                <DropDownSurvey onChange={set_selected_modality} options={modalityy} select_type="Modality" customClassDrop={style.drop_down}/>
                <DropDownSurvey onChange={set_language} options={language} select_type="Language" customClassDrop={style.drop_down}/>
            </Box>
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
