import { Box } from '@mui/material';
import React from 'react';
import InsideSurveyTabTab from '../insideSurveytab/InsideSurveyTabTab';

interface SurveyInfoProps {
  survey: any;
}

const SurveyInfo: React.FC<SurveyInfoProps> = ({ survey }) => {
  if (!survey) {
    return <div>Loading...</div>;
  }
  console.log("Survey=========",survey)

  return (
    <div>
      {/* <h2>{name}</h2>
      <p>Type: {survey?.survey_type.name}</p>
      <p>Abbreviation: {survey?.abbr}</p>
      <p>Questions: {survey?.questions.length}</p>
      <p>Modified: {new Date(survey?.updatedAt).toISOString().split('T')[0]}</p>
      <p>Status: {survey?.is_published ? 'Published' : 'Unpublished'}</p> */}

      <Box>
        {/* <InsideSurveyTabTab survey={survey} /> */}
      </Box>
    </div>
  );
};

export default SurveyInfo;
