import React from 'react';
import { Box, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

interface QuestionComponentProps {
  question: any;
}

const PrevQuestionComponent: React.FC<QuestionComponentProps> = ({ question }) => {
  console.log("Question Details: ", question);
console.log("QUESTIOJN",question?.question_type?.abbr)
  const renderQuestion = () => {
    switch (question?.question_type?.abbr) {
      case 'mc':
        return (
          <RadioGroup
            row
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {['1', '2', '3', '4'].map(value => (
              <FormControlLabel
                key={value}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                value={value}
                control={<Radio />}
                label={value}
              />
            ))}
          </RadioGroup>
        );
      case 'Y/N':
        return (
          <RadioGroup
            row
            sx={{
              display: "flex",
              flexDirection: "column",
              fontFamily: 'Arial, sans-serif',
          fontWeight: '500',
          fontSize:"20px"
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        width: "100%",
        height: "196px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: "20px",
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
      }}
    >
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontFamily: 'Arial, sans-serif',
        fontWeight: '500',
        fontSize:"20px"
          
        }}
      >
        {question.description} - {question.abbr}
      </Typography>
      <Box sx={{
        fontFamily: 'Arial, sans-serif',
        fontWeight: '500',
        fontSize:"20px"
      }}>
              {renderQuestion()}


      </Box>
    </Box>
  );
};

export default PrevQuestionComponent;
