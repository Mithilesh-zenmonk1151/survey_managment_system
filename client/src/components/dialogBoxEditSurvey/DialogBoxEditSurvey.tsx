import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Switch, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question_type } from "@/slice/question_type/question_type_action";
import { update_question } from "@/slice/question/question_action";
import { get_survey, put_survey } from "@/slice/survey/survey_action";
import { get_survey_type } from "@/slice/survey_type/survey_type_action";

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
  // const [languages, setLanguages] = useState<string>("");
  const [description, setDescription] = useState(question?.name);
  const [abbr, setAbbr] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [selectedValueType, setSelectedValueType] = useState<string>("");
  const [selectedModality, setSelectedModality] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isMandatory, setIsMandatory] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (question) {
      // setDescription(question.name);
      setAbbr(question.abbreviation);
      setName(question.name);
      setSelectedValueType(question.survey_type?.name || "");
      setSelectedModality(question.options?.modality || "");
      setSelectedLanguage(question.options?.languages || "");
      setIsMandatory(question.options?.mandatory || false);
      setSelectedSurveyTypeId(question.survey_type?.id.toString() || "");
    }
  }, [question]);

  useEffect(() => {
    dispatch(get_question_type());
    dispatch(get_survey_type());
  }, [dispatch]);

  const questionType = useAppSelector((state) => state.question_type?.content?.response);
  const surveyTypes = useAppSelector((state) => state.survey_type?.content?.response || []);
const modality=selectedModality;
const languages =selectedLanguage;
  const options = { modality, languages };
  const survey_type_id = selectedSurveyTypeId ? parseInt(selectedSurveyTypeId) : 0;

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
    const id = question?.id;
    const survey = {name, options, survey_type_id, id };
    await dispatch(put_survey(survey));
    dispatch(get_survey());
    onClose();
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
