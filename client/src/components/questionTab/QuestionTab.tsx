import React, { useState } from 'react';
import { Box, Button, Typography, Switch, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { get_question_of_survey } from '@/slice/question/question_action';
import CustomButton from '@/components/customButton/CustomButton';
import SearchbarCompo from '@/components/searchBar/SearchBarCompo';
import DropDownQuest from '../dropDownQuest/DropDownQuest';
import CheckBoxDropDown from '@/components/checkBoxDropDown/CheckBoxDropDown';
import DialogBox from '@/components/DialogBox/DialogBox';
import SurveyQuestionTable from '../surveyQuestionTable/SurveyQuestionTable';
import EnhancedTable from '../checkBoxTableComponent/CheckBoxTableComponent';
import './QuestionTab.styles.css';
import SearchingDropDown from '../searchingDropDown/SearchingDropDown';
interface SurveyInfoProps {
  survey: any;
}
const QuestionTab: React.FC<SurveyInfoProps> = ({ survey }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm,setSearchTerm]= useState("");
  const [selectedType, setSelectedType] = useState("");
  const [checkSelectedType,setCheckSelectedType]=useState("");
  const question_type = useAppSelector((state) => state.question_type?.content?.response) || [];
  const abbr= useAppSelector((state)=>state.questions?.content?.response?.data?.rows);
  const dummyOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };
  return (
    <Box display="flex" flexDirection="row" height="100vh" overflow="hidden">
      <Box
        flex={drawerOpen ? 1 : 2}
        transition="flex 0.3s"
        overflow="auto"
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box> </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box onClick={handleDrawerToggle}>
              {drawerOpen ? (
                <ArrowForwardIcon
                  sx={{ cursor: 'pointer', border: '1px solid black' }}
                />
              ) : (
                <Button
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                >
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
              <Box sx={{ display: 'flex', gap: '30px',alignItems:"center" }}>
                <SearchbarCompo value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                customPlaceHolder="Search..."/>
                <SearchingDropDown   options={question_type} 
                em_name="Type" 
                em="Type" 
                value={selectedType}
                select_type=""
                onChange={(value) => setSelectedType(value)} />
                <CheckBoxDropDown  select_type="abbriviation" options={abbr} em_name="Abbriviation" em="Abbriviation" onChange={(value)=>setCheckSelectedType(value)} />
                <Button>Clear</Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Switch aria-label="Show deleted" />
                <Typography>Show deleted</Typography>
              </Box>
            </Box>
            <SurveyQuestionTable survey={survey} searchTerm={searchTerm} selectedType={selectedType} checkSelectedType={checkSelectedType} />
          </Box>
        </Box>
      </Box>
      <Stack
        flex={drawerOpen ? 1 : 0}
        transition="flex 0.5s"
        className={`drawer ${drawerOpen ? 'open' : 'closed'}`}
        overflow="auto"
      >
        <EnhancedTable survey={survey} />
      </Stack>
    </Box>
  );
};

export default QuestionTab;
