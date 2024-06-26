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

  return (
    <div>
      


      <Box>
        <InsideSurveyTabTab survey={survey} />
      </Box>
    </div>
  );
};

export default SurveyInfo;
