import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField, Button } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question_type } from "@/slice/question_type/question_type_action";
import { update_question } from "@/slice/question/question_action";
import toast from "react-hot-toast";
import { update_survey_question } from "@/slice/survey_question/survey_question_action";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DataRow {
  id: number;
  name: string;
  type: string;
  abbreviation: string;
  modified: string;
}

interface Question {
  id: number;
  type: string;
  abbreviation: string;
  description: string;
}

interface EditQuestionDialogBoxProps {
  open: boolean;
  onClose: () => void;
  question: DataRow | null;
  survey:{id:number}
}

const EditSurveyQuestionDialogBox: React.FC<EditQuestionDialogBoxProps> = ({open, onClose, question, survey }) => {
  const [question_description, set_question_description] = useState(question?.name || "");
  const [abbr, setAbbr] = useState(question?.abbreviation || "");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (question) {
      set_question_description(question.name);
      setAbbr(question.abbreviation);
    }
  }, [question]);
  const question_id= question?.id;
  const survey_id=survey?.id
  const survey_question= {question_id,survey_id,question_description}

// const questionType = useAppSelector((state) => state.question_type?.content?.response);

  const handleSave = () => {
    try{
        dispatch(update_survey_question(survey_question));
        

    }
    catch(error){
        console.log("error");
        toast.error("error in updating question")
    }
    
    onClose();
  };

  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit Question
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "30px" }}>
            <TextField
              placeholder="Question Type"
              value={question?.type}
              disabled
            />
            <TextField
              value={abbr}
              onChange={(e) => setAbbr(e.target.value)}
              placeholder="Abbreviation"
              disabled
            />
          </Box>
          <Textarea
            minRows={2}
            maxRows={50}
            sx={{ width: "100%" }}
            placeholder="Question"
            value={question_description}
            onChange={(e) => set_question_description(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Update</Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditSurveyQuestionDialogBox;
