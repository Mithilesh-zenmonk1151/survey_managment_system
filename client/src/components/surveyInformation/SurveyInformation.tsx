import React, { useEffect } from 'react';
import { Box, Switch, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import OppositeContentTimeline from '../timeline/TimeLine'; // Ensure this component displays the timeline correctly
import { useAppDispatch } from '@/store/hooks';
import { get_question_of_survey } from '@/slice/question/question_action';

interface SurveyInformationProps {
  survey: any;
}

function SurveyInformation({ survey }: SurveyInformationProps) {
  const languages = [
    { id: "1", name: "English", value: "English" },
    { id: "2", name: "Spanish", value: "Spanish" },
    { id: "3", name: "Chinese", value: "Chinese" },
    { id: "4", name: "Italian", value: "Italian" },
    { id: "5", name: "French", value: "French" },
    { id: "6", name: "Portuguese", value: "Portuguese" }
  ];

  const surveyTypes = [
    { id: "1", name: "Student Satisfaction With The Content Of The Subject (SSAC)" },
    { id: "2", name: "Course Feedback" },
    { id: "3", name: "Instructor Evaluation" }
  ];

  const modalities = [
    { id: "1", name: "In Person" },
    { id: "2", name: "Online" },
    { id: "3", name: "Hybrid" }
  ];

  if (!survey) {
    return <div>Loading...</div>;
  }

  console.log("Survey data:", survey);
  const survey_id=survey?.id;
  console.log("SSSUUURRRVVVVEEEYYYYIIID",survey_id)
  const dispatch= useAppDispatch();
    useEffect(()=>{
        dispatch(get_question_of_survey(survey_id))
    },[dispatch])


const fetchSurveyQuestions = ({surveyId}:number) => {
  dispatch(get_question_of_survey({ survey_id: surveyId }))
    .unwrap()
    .then((response) => {
      console.log("Survey questions:", response);
    })
    .catch((error) => {
      console.error("Error fetching survey questions:", error);
    });
};

// Call the function with the desired survey ID
fetchSurveyQuestions(1); // Replace 1 with the actual survey ID


  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: "30px" }}>
          <Typography variant="h6">Basic Information</Typography>
          <TextField
            id="outlined-name"
            label="Name"
            variant="outlined"
            sx={{ width: "90%" }}
            value={survey?.name || ''}
            onChange={(e) => console.log('Name changed:', e.target.value)} // Implement change handler as needed
          />
          <TextField
            id="outlined-abbr"
            label="Abbreviation"
            variant="outlined"
            sx={{ width: "90%" }}
            value={survey?.abbr || ''}
            disabled
          />
          <FormControl sx={{ width: "90%" }}>
            <InputLabel id="type-label">Type of Survey</InputLabel>
            <Select
              labelId="type-label"
              id="outlined-type"
              label="Type of Survey"
              value={survey?.type || ''}
              onChange={(e) => console.log('Type of Survey changed:', e.target.value)} // Implement change handler as needed
            >
              {surveyTypes.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "90%" }}>
            <InputLabel id="modality-label">Modality</InputLabel>
            <Select
              labelId="modality-label"
              id="outlined-modality"
              label="Modality"
              value={survey?.modality || ''}
              onChange={(e) => console.log('Modality changed:', e.target.value)} // Implement change handler as needed
            >
              {modalities.map((modality) => (
                <MenuItem key={modality.id} value={modality.name}>
                  {modality.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "90%" }}>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
              labelId="language-label"
              id="outlined-language"
              label="Language"
              value={survey?.language || ''}
              onChange={(e) => console.log('Language changed:', e.target.value)} // Implement change handler as needed
            >
              {languages.map((lang) => (
                <MenuItem key={lang.id} value={lang.value}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-questions"
            label="N. questions"
            variant="outlined"
            sx={{ width: "90%" }}
            value={survey?.questions?.length || 0}
            disabled
          />
          <Box>
            <Typography>Mandatory</Typography>
            <Switch checked={survey?.is_mandatory || false} disabled />
          </Box>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>Dates</Typography>
          <Box sx={{ bgcolor: "#fafafa", border: "1px solid #e0e0e0", width: "85%", padding: 2 }}>
            <OppositeContentTimeline timeline={survey?.timeline} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SurveyInformation;
