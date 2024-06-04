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
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DropDown from "../dropDown/DropDown";
import DropDownForEditSurvey from "../dropDownForEditSurvey/DropDownForEditSurvey";
import { create_survey, get_survey } from "@/slice/survey/survey_action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_survey_type } from "@/slice/survey_type/survey_type_action";
import toast from "react-hot-toast";

const DialogBoxSurvey: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedSurveyTypeId, setSelectedSurveyTypeId] = useState("");
  const [modality, setModality] = useState("");
  const [languages, setLanguages] = useState("");
  const [abbr, setAbbr] = useState("");
  const [mandatory, setMandatory] = useState(false);
  const dispatch = useAppDispatch();

  const surveyTypes = useAppSelector(
    (state) => state.survey_type?.content?.response || []
  );

  useEffect(() => {
    dispatch(get_survey_type());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateSurvey = async () => {
    const survey = {
      name,
      is_published: false,
      abbr,
      options: { modality, languages },
      survey_type_id: parseInt(selectedSurveyTypeId),
      mandatory,
    };

    try {
      await dispatch(create_survey(survey)).unwrap();

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
          <p>Survey Created Successfully</p>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() => toast.dismiss()}
          />
        </div>
      );

      toast.custom(() => <CustomToast />);
      await dispatch(get_survey());

      setOpen(false);
      setName("");
      setAbbr("");
      setModality("");
      setLanguages("");
      setSelectedSurveyTypeId("");
    } catch (error) {
      toast.error("Failed to create survey");
    }
    setOpen(false);
  };

  const modalities = [
    { id: "1", name: "In Person", value: "In Person" },
    { id: "2", name: "Online", value: "Online" },
  ];

  const languagesOptions = [
    { id: "1", name: "English", value: "English" },
    { id: "2", name: "Spanish", value: "Spanish" },
    { id: "3", name: "Chinese", value: "Chinese" },
    { id: "4", name: "Italian", value: "Italian" },
    { id: "5", name: "French", value: "French" },
    { id: "6", name: "Portuguese", value: "Portuguese" },
  ];

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
            bgcolor: "#1c5091", // Keep the same background color on hover
          },
          '&:active': {
            bgcolor: "#1c5091", // Keep the same background color on click
          },
        }}
        onClick={handleClickOpen}
      >
        CREATE
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            height: "360px",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, paddingBottom:"0px" ,fontWeight:"500",fontSize:"21px",color:"#5A5A5A"}} id="customized-dialog-title">
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
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{
          paddingBottom:0,
          
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px",marginBottom:"0px" }}>
            <TextField
              label="Survey Name"
              sx={{
                marginTop: "12px",
                width: "100%",
                borderRadius: "8px",
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderRadius: '8px',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1rem',
                  color: '#555',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ccc',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#888',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3f51b5',
                },
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                gap: "20px",
              }}
            >
              <TextField
                label="Abbreviation"
                sx={{
                  width: "89%",
                  borderRadius: "8px",
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderRadius: '8px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                    color: '#555',
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '10px 14px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ccc',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3f51b5',
                  },
                }}
                value={abbr}
                onChange={(e) => setAbbr(e.target.value)}
              />
              <DropDown
                value={selectedSurveyTypeId}
                onChange={(value: string) => setSelectedSurveyTypeId(value)}
                options={surveyTypes}
                select_type="Type of Survey"
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
              <DropDownForEditSurvey
                value={modality}
                onChange={(value: string) => setModality(value)}
                options={modalities}
                select_type="Modality"
              />
              <DropDownForEditSurvey
                value={languages}
                onChange={(value: string) => setLanguages(value)}
                options={languagesOptions}
                select_type="Language"
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column",  }}>
              <FormControlLabel
                control={<Switch checked={mandatory} onChange={(e) => setMandatory(e.target.checked)} />}
                label="Mandatory"
                sx={{
                  padding:"0px"
                }}
              />
              <Typography variant="body2" color="textSecondary" sx={{
                marginLeft: "47px",
                position: "relative",
                bottom: "7px"
              }}>
                Toggle survey mandatory status
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{
         position:"relative",
         bottom:"24px",
         paddingBottom:"0px"
        }}>
          <Button onClick={handleClose} sx={{ color: "#757575" ,fontWeight:"700",fontSize:"17px"}}>
            CANCEL
          </Button>
          <Button onClick={handleCreateSurvey} sx={{ color: "#1c5091",fontWeight:"700",fontSize:"17px" }}>
            CREATE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogBoxSurvey;
