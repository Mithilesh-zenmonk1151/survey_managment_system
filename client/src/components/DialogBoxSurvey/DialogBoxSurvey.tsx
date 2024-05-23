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
import DropDownForEditSurvey from "../dropDownForEditSurvey/DropDownForEditSurvey";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { create_survey } from "@/slice/survey/survey_action";
import { get_survey_type } from "@/slice/survey_type/survey_type_action";

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

const DialogBoxSurvey: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, set_name] = useState("");
  const [selected_question_type_id, set_selected_question_type_id] =useState("");
  const [modality, set_modality] = useState("");
  const [languages, set_languages] = useState("");
  const [abbr, set_abbr] = useState("");
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateSurvey = () => {
    const survey = {
      name,
      is_published: false,
      abbr,
      options: { modality, languages },
      survey_type_id: parseInt(selected_question_type_id),
    };

    try {
      dispatch(create_survey(survey));
      console.log("Survey created:", survey);
      setOpen(false); // Close dialog after creating survey
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };
  

  // useEffect(() => {
  //  dispatch(get_survey_type())
  // }, [dispatch]);
  useEffect(()=>{
    dispatch(get_survey_type());
  },[dispatch])
  const survey_type= useAppSelector((state)=>state.survey_type?.content?.response )
  // console.log("safdssadsfsdkosuijisbfoisiofsioiofdsiofdsidfsifdsiodfsiio",survey_type)

  const question_type = useAppSelector(
    (state) => state.survey_type?.content?.response
  );

  const modalityy = [
    { id: "1", name: "In Person", value: "In Person" },
    { id: "2", name: "Online", value: "Online" },
  ];

  const language = [
    { id: "1", name: "English", value: "English" },
    { id: "2", name: "Spanish", value: "Spanish" },
    { id: "3", name: "Chinese", value: "Chinese" },
    { id: "4", name: "Italian", value: "Italian" },
    { id: "5", name: "French", value: "French" },
    { id: "6", name: "Portuguese", value: "Portuguese" },
  ];

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
          >
            {/* <CloseIcon /> */}
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
            <Box>
              <TextField
                label="Survey Name"
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                value={name}
                onChange={(e) => set_name(e.target.value)}
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
                options={survey_type}
                value={selected_question_type_id}
                onChange={set_selected_question_type_id}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <DropDownForEditSurvey
                value={modality}
                onChange={(value: string) => set_modality(value)}
                options={modalityy}
                select_type="Modality"
              />
              <DropDownForEditSurvey
                value={languages}
                onChange={(value: string) => set_languages(value)}
                options={language}
                select_type="Language"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleCreateSurvey}>
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DialogBoxSurvey;
