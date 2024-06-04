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
import PrevQuestionComponent from '../prevQuestion/PreviueQuestion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { get_question_of_survey } from '@/slice/question/question_action';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    maxHeight: 650,
    overflowY: 'auto',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
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
    abbr:string;
  };
  abbr: string;
  createdAt: string;
}
export default function PreviewDialogBox({ survey }: SurveyInformationProps) {
  const [open, setOpen] = React.useState(false);
  console.log("SUUUU$$@$@$$@",survey.id)
  const [response, setResponse] = React.useState<Question[]>([]);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const dispatch=useAppDispatch();

  const handleClose = () => {
    setOpen(false);
  };

const survey_id=survey?.id;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(get_question_of_survey(survey_id));
        console.log("DATA",data)
        //  setResponse(respo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      fetchData();
    };
  },[dispatch,survey_id]
  )
  const states=useAppSelector((state)=>state.questions)
  console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR===",states);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Preview
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} sx={{
        maxHeight:"650px",
        position:"absolute",
        top:"150px",
       width:"auto"
      }}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
            {survey.name} - {survey.options?.modality} ({survey.abbr})
          </Typography>
        </DialogTitle>
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
        <DialogContent >



{/* 
        {questions.map((question) => (

          <PrevQuestionComponent key={question.id} question={question}/>
          
        ))} 
           */}
          
          
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
