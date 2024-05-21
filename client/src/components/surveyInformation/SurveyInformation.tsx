import { Box, Switch, TextField, Typography } from '@mui/material';
import React from 'react';
import DropDownForEditSurvey from '../dropDownForEditSurvey/DropDownForEditSurvey';
import OppositeContentTimeline from '../timeline/TimeLine';

interface SurveyInformationProps {
  survey: any;
}

function SurveyInformation({ survey }: SurveyInformationProps) {
  const language = [
    { id: "1", name: "English", value: "English" },
    { id: "2", name: "Spanish", value: "Spanish" },
    { id: "3", name: "Chinese", value: "Chinese" },
    { id: "4", name: "Italian", value: "Italian" },
    { id: "5", name: "French", value: "French" },
    { id: "6", name: "Portuguese", value: "Portuguese" }
  ];

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "30px" }}>
          <Typography>Basic Information</Typography>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ width: "90%" }}
            value={survey.name || ''}
            disabled
          />
          <TextField
            id="outlined-abbr"
            label="Abbreviation"
            variant="outlined"
            sx={{ height: "50%", width: "90%" }}
            value={survey.abbr || ''}
            disabled
          />
          {language.map((lang) => (
            <DropDownForEditSurvey key={lang.id} options={language} />
          ))}
          <TextField
            label="N. question"
            disabled
            sx={{ width: "90%" }}
            value={survey.questions.length || ''}
          />
          <Box>
            <Typography>Mandatory</Typography>
            <Switch checked={survey.is_mandatory} disabled />
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>Dates</Typography>
          <Box sx={{ bgcolor: "#fafafa", border: "1px solid #e0e0e0", width: "85%", height: "45%" }}>
            <OppositeContentTimeline />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SurveyInformation;
