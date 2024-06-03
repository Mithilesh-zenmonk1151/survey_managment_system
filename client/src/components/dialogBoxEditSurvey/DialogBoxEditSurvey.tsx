import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Switch,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question_type } from "@/slice/question_type/question_type_action";
import { get_survey, put_survey } from "@/slice/survey/survey_action";
import { get_survey_type } from "@/slice/survey_type/survey_type_action";
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
  survey_type: any[];
  options: any[];
}

interface EditSurveyDialogBoxProps {
  open: boolean;
  onClose: () => void;
  question: DataRow | null;
}

const EditSurveyDialogBox: React.FC<EditSurveyDialogBoxProps> = ({ open, onClose, question }) => {
  const [selectedSurveyTypeId, setSelectedSurveyTypeId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [abbr, setAbbr] = useState<string>("");
  const [selectedModality, setSelectedModality] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isMandatory, setIsMandatory] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (question) {
      setAbbr(question.abbreviation);
      setName(question.name);
      setSelectedSurveyTypeId(question.survey_type?.id.toString() || "");
      setSelectedModality(question.options?.modality || "");
      setSelectedLanguage(question.options?.languages || "");
      setIsMandatory(question.options?.mandatory || false);
    }
  }, [question]);

  useEffect(() => {
    dispatch(get_question_type());
    dispatch(get_survey_type());
  }, [dispatch]);

  const surveyTypes = useAppSelector((state) => state.survey_type?.content?.response || []);

  const modalities = [
    { id: "1", name: "In Person", value: "In Person" },
    { id: "2", name: "Virtual", value: "Virtual" },
  ];

  const languageOptions = [
    { id: "1", name: "English", value: "English" },
    { id: "2", name: "Spanish", value: "Spanish" },
    { id: "3", name: "Chinese", value: "Chinese" },
    { id: "4", name: "Italian", value: "Italian" },
    { id: "5", name: "French", value: "French" },
    { id: "6", name: "Portuguese", value: "Portuguese" },
  ];

  const handleSave = async () => {
    if (!question) return;

    const survey = {
      id: question.id,
      name,
      abbr,
      options: {
        modality: selectedModality,
        languages: selectedLanguage,
        mandatory: isMandatory,
      },
      survey_type_id: selectedSurveyTypeId ? parseInt(selectedSurveyTypeId) : 0,
    };

    try {
      await dispatch(put_survey(survey)).unwrap();
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
          <p> Survey Updated Successfully</p>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={handleCloseToast}
          />
        </div>
      );
    };

    toast.custom(() => <CustomToast />);
      dispatch(get_survey());
      onClose();
    } catch (error) {
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
            <p>Failed to update survey</p>
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
    <BootstrapDialog
      sx={{ minWidth: "448px" }}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit Survey
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
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            id="outlined-name"
            label="Survey Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Box sx={{ display: "flex", gap: "16px" }}>
            <TextField
              id="outlined-abbreviation"
              label="Abbreviation"
              variant="outlined"
              value={abbr}
              onChange={(e) => setAbbr(e.target.value)}
              sx={{ width: "50%" }}
              disabled
            />
            <FormControl fullWidth variant="outlined" sx={{ width: "50%" }}>
              <InputLabel id="type-of-survey-label">Type of Survey</InputLabel>
              <Select
                labelId="type-of-survey-label"
                id="type-of-survey"
                variant="outlined"
                value={selectedSurveyTypeId}
                onChange={(e) => setSelectedSurveyTypeId(e.target.value)}
                label="Type of Survey"
              >
                {surveyTypes.map((type: any) => (
                  <MenuItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: "16px" }}>
            <FormControl fullWidth variant="outlined" sx={{ width: "50%" }}>
              <InputLabel id="modality-label">Modality</InputLabel>
              <Select
                labelId="modality-label"
                id="modality"
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                label="Modality"
              >
                {modalities.map((type: any) => (
                  <MenuItem key={type.id} value={type.value}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ width: "50%" }}>
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                label="Language"
              >
                {languageOptions.map((lang) => (
                  <MenuItem key={lang.id} value={lang.value}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Typography>Mandatory</Typography>
            <Switch
              checked={isMandatory}
              onChange={(e) => setIsMandatory(e.target.checked)}
              color="primary"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Update</Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditSurveyDialogBox;
