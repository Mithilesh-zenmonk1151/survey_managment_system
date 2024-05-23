import React, { useState } from 'react';
import { Box, Button, Typography, Switch, Drawer, Stack } from '@mui/material';
import CustomButton from '@/components/customButton/CustomButton';
import SearchbarCompo from '@/components/searchBar/SearchBarCompo';
import BasicTabs from '@/components/tabComponent/BasicTab';
import StickyHeadTable from '@/components/tableOneComponent/StickyHeadTable';
import DropDown from '@/components/dropDown/DropDown';
import CheckBoxDropDown from '@/components/checkBoxDropDown/CheckBoxDropDown';
import DialogBox from '@/components/DialogBox/DialogBox';
import QuestionTableComponent from '@/components/questionTableComponent/QuestionTableComponent';
import DropDownQuest from '../dropDownQuest/DropDownQuest';
import AddQuestionToSurveyDrwar from '../addQuestionToSurveyDrawer/AddQuestionToSurveyDrwaer';
import SurveyQuestionTable from '../surveyQuestionTable/SurveyQuestionTable';
import { useAppDispatch } from '@/store/hooks';
import { get_question_of_survey } from '@/slice/question/question_action';
import PersistentDrawerRight from '../addQuestionToSurveyDrawer/AddQuestionToSurveyDrwaer';
import TemporaryDrawer from '../addQuestionToSurveyDrawer/AddQuestionToSurveyDrwaer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './QuestionTab.styles.css'
import CheckBoxtableComponent from '../checkBoxTableComponent/CheckBoxTableComponent';
import EnhancedTable from '../checkBoxTableComponent/CheckBoxTableComponent';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
interface surveyInfoProps{
    survey:any
}

export default function QuestionTab({survey}:surveyInfoProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


  const dummyOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <Box display={"flex"} flexDirection={"row"} sx={{
        display:"flex",
    }}>
    <Box flex={1}  className={`drawer ${drawerOpen ? 'tableClose' : 'tableOpen'}`}>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
        }}  >
            {/* <Typography sx={{
            fontSize: "22px",
            fontWeight: "600",
            fontFamily: ""
            }}>Questions List</Typography> */}
            <Box> </Box>
            <Box sx={{
            display: "flex",
            }}>
            <Box  onClick={handleDrawer}>
                {drawerOpen ? <ArrowForwardIcon sx={{
                    cursor:"pointer",
                    borderRight:"1px solid white",
                  
                    bgcolor:"white",
                    position:"relative",
                    top:"20px",
                    left:"10px",
                   
                    borderRadius:"30x"
                }}/> : <Button variant='outline' sx={{
                    bgcolor:"white",
                    
                }}> Add</Button>}
            </Box>
            {drawerOpen ? ' ' : <DialogBox />}
            </Box>
        </Box>
        <Box sx={{
            bgcolor: "white",
            borderRadius: "5px"
        }} >
            <Box sx={{
            marginTop: "10px"
            }} >
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",

            }} >
                <Box sx={{
                display: "flex",
                gap: "30px"
                }}>
                <SearchbarCompo />
                <DropDownQuest options={dummyOptions} value={dummyOptions.value} />
                <CheckBoxDropDown />
                <Button>Clear</Button>
                </Box>
                <Box sx={{
                display: "flex",
                alignItems: "center"
                }}>
                <Switch {...label} aria-label='Show deleted' />
                <Typography>Show deleted</Typography>
                </Box>
            </Box>
            <SurveyQuestionTable survey={survey} />
            </Box>
        </Box>
        {/* <Drawer
            anchor='right'
            open={drawerOpen}
            onClose={handleDrawerClose}
            variant='temporary'
            sx={{
                height:"500px"
            }}
            
        >
            {/* <AddQuestionToSurveyDrwar onClose={handleDrawerClose} /> */}
        {/* </Drawer> */} 
        {/* <PersistentDrawerRight/> */}
        {/* <TemporaryDrawer/> */}
        </Box>
        <Stack flex={1} className={`drawer ${drawerOpen ? 'open' : 'closed'}`}>
            {/* <CheckBoxtableComponent/> */}
            <EnhancedTable survey={survey} />
    
        </Stack>
    </Box>
    
  );
}
