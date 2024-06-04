import React from 'react';
import { Box, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

interface QuestionComponentProps {
  question: any;
}

const PrevQuestionComponent: React.FC<QuestionComponentProps> = ({ question }) => {
  const renderQuestion = () => {
    switch (question.abbr) {
      case 'MCQ': 
        return (
          <RadioGroup row>
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
          </RadioGroup>
        );
      case 'YN': 
        return (
          <RadioGroup row>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
      <Typography variant="body1" gutterBottom>
        {question.description} - {question.abbr}
      </Typography>
      {renderQuestion()}
    </Box>
  );
};

export default PrevQuestionComponent;
