import React, { useState } from 'react';
import { Box, Button, Typography, Switch, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CustomButton from '@/components/customButton/CustomButton';
import SearchbarCompo from '@/components/searchBar/SearchBarCompo';
import CheckBoxDropDown from '@/components/checkBoxDropDown/CheckBoxDropDown';
import DialogBox from '@/components/DialogBox/DialogBox';
import SurveyQuestionTable from '../surveyQuestionTable/SurveyQuestionTable';
import EnhancedTable from '../checkBoxTableComponent/CheckBoxTableComponent';
import './QuestionTab.styles.css';
import SearchingDropDown from '../searchingDropDown/SearchingDropDown';
import { get_question_of_survey } from '@/slice/question/question_action';

interface SurveyInfoProps {
  survey: any;
}
interface DataRow {
  id: number;
  name: string;
  type: string;
  abbreviation: string;
  modified: string;
}
interface Question {
  id: number;
  description: string;
  question_type: {
    name: string;
  };
  abbr: string;
  createdAt: string;
}
const QuestionTab: React.FC<SurveyInfoProps> = ({ survey }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [checkSelectedType, setCheckSelectedType] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  
const  dispatch=useAppDispatch();
// Define a callback function to receive the selected question IDs
const handleSelectedQuestions = (selected:  Question[]) => {
  setSelectedQuestions(selected);
};
const survey_id= survey?.id;

  const question_type = useAppSelector((state) => state.question_type?.content?.response) || [];
  const abbr = useAppSelector((state) => state.questions?.content?.response?.data?.rows);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };
  const handleClearClick =async()=>{
    setSearchTerm("");
    setSelectedType("");
    setCheckSelectedType("");
    dispatch(get_question_of_survey(survey_id));
    // const {reee}=await dispatch(get_question_of_survey(survey_id));
  }

  const {content} = useAppSelector((state) => state.questions)

  return (
    <Box display="flex" flexDirection="row" height="100vh" overflow="hidden">
      <Box flex={drawerOpen ? 1 : 2} transition="flex 0.3s" overflow="auto">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box> </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box onClick={handleDrawerToggle}>
              {drawerOpen ? (
                <ArrowForwardIcon
                  sx={{ cursor: 'pointer', borderLeft: '2px solid black',borderRadius:"20px",bgcolor:"white",marginLeft:"30px" }}
                />
              ) : (
                <Button variant="outlined" sx={{ bgcolor: 'white' }}>
                  Add
                </Button>
              )}
            </Box>
            {!drawerOpen && <DialogBox />}
          </Box>
        </Box>
        <Box sx={{ bgcolor: 'white', borderRadius: '5px' }}>
          <Box sx={{ padding: '30px', marginTop: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <SearchbarCompo 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  customPlaceHolder="Search..."
                />
                <SearchingDropDown
                  options={question_type}
                  em_name="Type"
                  em="Type"
                  value={selectedType}
                  select_type=""
                  onChange={(value) => setSelectedType(value)}
                />
                <CheckBoxDropDown 
                  select_type="abbreviation" 
                  options={abbr} 
                  em_name="Abbreviation" 
                  em="Abbreviation" 
                  onChange={(value) => setCheckSelectedType(value)} 
                />
                <Button onClick={handleClearClick}>Clear</Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch aria-label="Show deleted" />
                <Typography>Show deleted</Typography>
              </Box>
            </Box>
            <SurveyQuestionTable 
              survey={survey} 
              searchTerm={searchTerm} 
              selectedType={selectedType} 
              checkSelectedType={checkSelectedType} 
              selecttedQuestions={selectedQuestions}
              questionss={content}
            />
          </Box>
        </Box>
      </Box>
      <Stack
        flex={drawerOpen ? 1 : 0}
        transition="flex 0.5s"
        className={`drawer ${drawerOpen ? 'open' : 'closed'}`}
        overflow="auto"
      >
        <EnhancedTable survey={survey} onSelectedQuestions={handleSelectedQuestions}/>
      </Stack>
    </Box>
  );
};

export default QuestionTab;
