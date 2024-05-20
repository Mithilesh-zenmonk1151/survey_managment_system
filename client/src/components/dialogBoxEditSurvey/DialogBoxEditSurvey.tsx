import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { get_question_type } from "@/slice/question_type/question_type_action";
import { update_question } from "@/slice/question/question_action";
import DropDown from "../dropDown/DropDown";
import DropDownSurvey from "../dropDownSurvey/DropDownSurvey";
import DropDownForEditSurvey from "../dropDownForEditSurvey/DropDownForEditSurvey";
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
}

interface Question {
  id: number;
  type: string;
  abbreviation: string;
  description: string;
}

interface EditQuestionDialogBoxProps {
  open: boolean;
  onClose: () => void;
  question: DataRow | null;
}

const EditSurveyDialogBox: React.FC<EditQuestionDialogBoxProps> = ({ open, onClose, question }) => {
  const [selected_survey_type_id, set_selected_survey_type_id] = useState("");
  const [modality,set_selected_modality]=useState("");
  const [languages,set_language]= useState("");
const [description, set_description] = useState("");
  console.log("descriptiondsfrgdf",description)
  const [abbr, set_abbr] = useState("");
  const dispatch = useAppDispatch();
  console.log("QQQQQSSSSS=========================",question?.name);
  console.log("QQQQQSSSSS=========================",question?.id);




  useEffect(() => {
    if (question) {
      set_description(question.name);
      set_abbr(question.abbreviation);
      // Assuming you have a way to get question type ID from question
      // set_selected_question_type_id(question.question_type_id.toString());
    }
  }, [question]);

  useEffect(() => {
    dispatch(get_question_type());
  }, [dispatch]);
  const [name, set_name]=useState(question?.name);

  const question_type = useAppSelector((state) => state.question_type?.content?.response);

  const handleSave = () => {
    if (question) {
      const updatedQuestion = {
        id: question.id,
        description:description,
        
      };
    }
    onClose();
  };
  const sttt= useAppSelector((state)=>state.survey_type?.content?.response);
  console.log("Stateyujtyuty===sssss",sttt)
  const options= {modality,languages};
  const is_published=false;
  const survey_type_id = parseInt(selected_survey_type_id);
  // useEffect(()=>{
  //   dispatch(get_survey_type());

  // },[dispatch])
  // const survey_types= useAppSelector((state)=>state.survey_type);
  // console.log("Survey Type",survey_types)


  const survey= {name,is_published ,abbr,options,survey_type_id};
  console.log("Survey===",survey)
  const modalityy=[
    {"id":"1",
    "name":"In Persion",
    "value":"In Persion"

    },{
        "id":"2",
        "name":"In Value",
    "value":"In Value"


    }
  ]
  const language =[
    {"id":"1",
    "name":"English",
    "value":"English"

    },{
        "id":"2",
        "name":"Spanish",
    "value":"Spanish"


    },
    ,{
        "id":"3",
        "name":"Chinese",
    "value":"Chinese"


    }
    ,{
        "id":"4",
        "name":"Italian",
    "value":"Italian"


    }
    ,{
        "id":"5",
        "name":"French",
    "value":"French"


    }
    ,{
        "id":"6",
        "name":"Portuguese(Portuguese)",
    "value":"Portuguese(Portuguese)"


    }
  ]

  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "30px" }}>
            <TextField
              value={name}
              onChange={(e) => set_name(e.target.value)}
            />
           
          </Box>
          <Box sx={{
            display:'flex',
            gap:"20px"
          }}>
          <TextField
              
              value={question?.abbreviation}
              // onChange={(e) => set_abbr(e.target.value)}
              placeholder="Abbreviatiion"
              disabled
            />
          <DropDown
            select_type="Survey Type"
            options={sttt}
            value={selected_survey_type_id}
            onChange={set_selected_survey_type_id}
          />
          </Box>
          <Box sx={{
            display:"flex",
            gap:"30px"
          }}>
          <DropDownForEditSurvey onChange={set_selected_modality} options={modalityy} select_type="Modality" />
          <DropDownForEditSurvey onChange={set_language} options={language} select_type="Language" />







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
