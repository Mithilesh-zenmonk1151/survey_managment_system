import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  TextField,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DropDown from "../dropDown/DropDown";
import Textarea from "@mui/joy/Textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question_type } from "@/slice/question_type/question_type_action";
import {
  create_question,
  get_question,
} from "@/slice/question/question_action";
import toast from "react-hot-toast";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogBox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedQuestionTypeId, setSelectedQuestionTypeId] = useState("");
  const [description, setDescription] = useState("");
  const [abbr, setAbbr] = useState("");
  const dispatch = useAppDispatch();

  const questionTypes = useAppSelector(
    (state) => state.question_type?.content?.response || []
  );
  const questionError = useAppSelector((state) => state.questions?.error?.message);

  useEffect(() => {
    dispatch(get_question_type());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateQuestion = async () => {
    const question = {
      description,
      abbr,
      active: true,
      question_type_id: parseInt(selectedQuestionTypeId),
    };

    try {
      await dispatch(create_question(question)).unwrap(); // Unwraps the result for error handling

      if (!questionError) {
        const CustomToast = () => {
          const handleCloseToast = () => {
            toast.dismiss();
          };

          return (
            <div
              className="custom-toast"
              style={{
                background: "#4d9f49",
                color: "#ffffff",
                transition: "all 0.5s ease",
                height: "50px",
                width: "300px",
                alignItems: "center",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>Question Created Successfully</p>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={handleCloseToast}
              />
            </div>
          );
        };

        toast.custom(() => <CustomToast />);
      } else {
        const CustomToast = () => {
          const handleCloseToast = () => {
            toast.dismiss();
          };

          return (
            <div
              className="custom-toast"
              style={{
                background: "#4d9f49",
                color: "#ffffff",
                transition: "all 0.5s ease",
                height: "50px",
                width: "300px",
                alignItems: "center",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>{questionError || "Question cannot be created"}</p>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={handleCloseToast}
              />
            </div>
          );
        };

        toast.custom(() => <CustomToast />);
      }

      dispatch(get_question());
      setDescription("");
      setSelectedQuestionTypeId("");
      setAbbr("");
      setOpen(false);
    } catch (error) {
      console.error("Error creating question:", error);
      const CustomToast = () => {
        const handleCloseToast = () => {
          toast.dismiss();
        };

        return (
          <div
            className="custom-toast"
            style={{
              background: "red",
              color: "#ffffff",
              transition: "all 0.5s ease",
              height: "50px",
              width: "300px",
              alignItems: "center",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>{questionError || "Question cannot be created"}</p>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={handleCloseToast}
            />
          </div>
        );
      };

      toast.custom(() => <CustomToast />);
    }
  };

  return (
    <>
      
      <Button
        sx={{
          bgcolor: "#1c5091",
          color: "white",
          width: "83px",
          height: "36px",
          fontSize: "12px",
          '&:hover': {
            bgcolor: "#1c5091", 
          },
          '&:active': {
            bgcolor: "#1c5091",
          },
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
        <DialogTitle sx={{ m: 0, p: 2 ,width:"490px",fontWeight:"500",fontSize:"22px"}} id="customized-dialog-title">
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
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                marginTop:"10px"
              }}
            >
              <DropDown
                select_type="Question Type"
                options={questionTypes}
                value={selectedQuestionTypeId}
                onChange={setSelectedQuestionTypeId}
              />
              <TextField
              required
          placeholder="Abbreviation"
          value={abbr}
          onChange={(e) => setAbbr(e.target.value)}
          sx={{
            width: "100%",
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              height: '40px', // Adjust the height to match the Dropdown height
              '& fieldset': {
                borderRadius: '8px',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px', // Adjust padding to fit the height
            },
          }}
        />
            </Box>
            <Textarea
              minRows={2}
              maxRows={50}
              sx={{ width: "100%",height:"105px" }}
              placeholder="Question"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button sx={{
            color:"black"
          }} onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateQuestion}>Create</Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default DialogBox;
