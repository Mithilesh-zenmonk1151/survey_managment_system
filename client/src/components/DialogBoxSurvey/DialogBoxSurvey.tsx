import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box, TextField } from "@mui/material";
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
  const dispatch = useAppDispatch();

  const surveyTypes = useAppSelector((state) => state.survey_type?.content?.response || []);
  const surveys = useAppSelector((state) => state.survey?.content?.response?.data?.rows || []);
     

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
    };

    try {
      await dispatch(create_survey(survey));
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
              width: "800px",
              alignItems: "center",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              
            }}
          >
            <p>Survey Created Successfully</p>
            <CloseIcon sx={{
              cursor:"pointer"
            }} onClick={handleCloseToast} />
          </div>
        );
      };
      toast.custom(() => <CustomToast />);
      dispatch(get_survey());
      setOpen(false);
    } catch (error) {
      console.error("Error creating survey:", error);
      toast.error("Failed to create survey");
    }
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
        variant="outlined"
        sx={{
          bgcolor: "#1c5091",
          color: "white",
          width: "83px",
          height: "36px",
          fontSize: "12px",
        }}
        onClick={handleClickOpen}
      >
        CREATE
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
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
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <TextField
              label="Survey Name"
              variant="outlined"
              sx={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "30px" }}>
              <TextField
                placeholder="Abbreviation"
                value={abbr}
                onChange={(e) => setAbbr(e.target.value)}
              />
              <DropDown
                select_type="Survey Type"
                options={surveyTypes}
                value={selectedSurveyTypeId}
                onChange={(value: string) => setSelectedSurveyTypeId(value)}
              />
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
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
      </Dialog>
    </>
  );
};

export default DialogBoxSurvey;
