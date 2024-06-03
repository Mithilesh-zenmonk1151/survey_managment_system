"use client"
import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { Box, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question_type } from "@/slice/question_type/question_type_action";
import { get_question, update_question } from "@/slice/question/question_action";
import toast from "react-hot-toast";

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
}

const EditQuestionDialogBox: React.FC<EditQuestionDialogBoxProps> = ({
  open,
  onClose,
  question,
}) => {
  const [selected_question_type_id, set_selected_question_type_id] = useState("");
  const [description, set_description] = useState(question?.name || "");
  const [abbr, set_abbr] = useState(question?.abbreviation || "");
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (question) {
      set_description(question.name);
      set_abbr(question.abbreviation);
      // Assuming you have a way to get question type ID from question
      // set_selected_question_type_id(question.question_type_id.toString());
    }
  }, [question]);

  useEffect(() => {
    dispatch(get_question_type());
  }, [dispatch]);

  const question_type = useAppSelector(
    (state) => state.question_type?.content?.response
  );

  const handleSave = async () => {
    setError(null);
    try {
      if (question) {
        const updatedQuestion = {
          id: question?.id,
          description: description,
        };

        await dispatch(update_question(updatedQuestion)).unwrap();
        
        const CustomToast = () => (
          <div
            className="custom-toast"
            style={{
              background: "#4d9f49",
              color: "#ffffff",
              transition: "all 0.5s ease",
              height: "50px",
              width: "400px",
              alignItems: "center",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>Question updated successfully</p>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={() => toast.dismiss()} />
          </div>
        );

        toast.custom(() => <CustomToast />);

        await dispatch(get_question());
        onClose();
      }
    } catch (err) {
      setError(err || "Failed to update question");

      toast.custom(() => (
        <div
          className="custom-toast"
          style={{
            background: "#ff5252",
            color: "#ffffff",
            transition: "all 0.5s ease",
            height: "50px",
            width: "800px",
            alignItems: "center",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {err || "Failed to update question"}
          <CloseIcon sx={{ cursor: "pointer" }} onClick={() => toast.dismiss()} />
        </div>
      ));
    }
    onClose();
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px",
            }}
          >
            <TextField
              placeholder="Question Type"
              value={question?.type}
              disabled
            />
            <TextField
              value={question?.abbreviation}
              disabled
            />
          </Box>
          <Textarea
            minRows={2}
            maxRows={50}
            sx={{ width: "350px" }}
            placeholder="Question"
            value={description}
            onChange={(e) => set_description(e.target.value)}
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

export default EditQuestionDialogBox;
