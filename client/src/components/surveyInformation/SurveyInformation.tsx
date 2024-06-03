"use client"
import React, { useEffect, useState } from 'react';
import { Box, Switch, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import OppositeContentTimeline from '../timeline/TimeLine'; // Ensure this component displays the timeline correctly
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { get_question_of_survey } from '@/slice/question/question_action';
import { get_survey_type } from '@/slice/survey_type/survey_type_action';

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

  const moda=survey?.options?.modality
  const sselle=survey?.survey_type?.name
  const lang=survey?.options?.languages
  const [selected_value_type,set_selected_value_type]=useState(sselle);
  const [selected_modality, set_selected_modality]=useState(moda);
  const [selected_language,set_selected_language]=useState(lang);
  const dispatch= useAppDispatch();

  const surveyTypes = [
    { id: "1", name: "Student Satisfaction With The Content Of The Subject (SSAC)" },
    { id: "2", name: "Course Feedback" },
    { id: "3", name: "Instructor Evaluation" }
  ];
    // dispatch(get_survey_type());
  const survey_types= useAppSelector((state)=>state.survey_type?.content?.response)

  const modalities = [
    { id: "1", name: "In Person" },
    { id: "2", name: "Online" },
    { id: "3", name: "Hybrid" }
  ];

  if (!survey) {
    return <div>Loading...</div>;
  }

  const survey_id=survey?.id;
  // const dispatch= useAppDispatch();
  //   useEffect(()=>{
  //       dispatch(get_question_of_survey(survey_id))
  //   },[dispatch])
// const fetchSurveyQuestions = ({surveyId}:number) => {
//   dispatch(get_question_of_survey({ survey_id: surveyId }))
//     .unwrap()
//     .then((response) => {
//       console.log("Survey questions:", response);
//     })
//     .catch((error) => {
//       console.error("Error fetching survey questions:", error);
//     });
// };
// Call the function with the desired survey ID
// fetchSurveyQuestions(1); // Replace 1 with the actual survey ID
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
            onChange={(e) => console.log( e.target.value)} // Implement change handler as needed
          />
          <TextField
            id="outlined-abbr"
            label="Abbreviation"
            variant="outlined"
            sx={{ width: "90%" }}
            value={survey?.abbr || ''}
            disabled
          />
          <FormControl fullWidth variant="outlined" sx={{
            width:"90%"
          }}>
        <InputLabel id="type-of-survey-label">Type of Survey</InputLabel>
        <Select
          labelId="type-of-survey-label"
          id="type-of-survey"
          value={selected_value_type}
          onChange={(e) => set_selected_value_type( e.target.value)} 
          label="Type of Survey"
        >
          {survey_types?.map((type:any) => (
            <MenuItem key={type?.id} value={type?.name}>
              {type?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
         
          <FormControl fullWidth variant="outlined" sx={{
            width:"90%"
          }}>
        <InputLabel id="type-of-survey-label">Modality</InputLabel>
        <Select
          labelId="type-of-survey-label"
          id="type-of-survey"
          value={selected_modality}
          onChange={(e) => set_selected_modality( e.target.value)} // Implement change handler as needed
          label="Type of Survey"
        >
          {modalities.map((type:any) => (
            <MenuItem key={type?.id} value={type?.name}>
              {type?.name}
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
              value={selected_language}
              onChange={(e) => set_selected_language( e.target.value)} 
            >
              {languages?.map((lang) => (
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
            <OppositeContentTimeline survey={survey} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SurveyInformation;
