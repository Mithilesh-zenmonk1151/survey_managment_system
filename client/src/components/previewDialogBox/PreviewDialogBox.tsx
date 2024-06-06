import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import PrevQuestionComponent from '../prevQuestion/PreviueQuestion';
import Image from 'next/image';
import { Box } from '@mui/material';
import { get_question_of_survey } from '@/slice/survey_question/survey_question_action';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    maxHeight: 640,
    overflowY: 'auto',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '650px', // Set the fixed width
    maxWidth: '650px', // Ensure the maxWidth matches the fixed width
  },
}));

interface SurveyInformationProps {
  survey: any;
}

interface Question {
  id: number;
  description: string;
  question_type: {
    name: string;
    abbr: string;
  };
  abbr: string;
  createdAt: string;
}

export default function PreviewDialogBox({ survey }: SurveyInformationProps) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions?.content?.response);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      const data=dispatch(get_question_of_survey(survey?.id));
      console.log("DATATAT",data);
    }
  }, [dispatch, survey.id, open]);
  console.log("Sueefre",survey)
console.log("sSSSSSSSSSSSSSSS",survey);
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Preview
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Typography
      sx={{
        fontSize: '23px',
        fontWeight: '500',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      }}
    >
      {survey?.name} - {survey?.options?.modality} ({survey?.abbr})
    </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box sx={{
          width:"100%",
          height:"1px",
          display:"flex",
          justifyContent:"center"
        }}>
          <Box sx={{
            width:"91%",
            height:"1px",
            bgcolor:"#cccccc",
            marginRight:"18px"
          }}>

          </Box>
        </Box>
        <DialogContent >
          {questions?.length > 0 ? (
            questions?.map((question: Question) => (
              <PrevQuestionComponent key={question?.id} question={question} />
            ))
          ) : (
            <Box 
              sx={{
                textAlign: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems:"center",
                gap: 2,
              }}
            >
              <Image src="/images/NoSurveyQuestions.jpg" alt='No survey Question logo' width={300} height={200} />
              <Typography variant="h6" gutterBottom sx={{ fontSize: '22px', fontWeight: '500' }}>
                No Survey Questions
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions />
      </BootstrapDialog>
    </React.Fragment>
  );
}
