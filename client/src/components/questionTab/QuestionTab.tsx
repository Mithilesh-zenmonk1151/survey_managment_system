"use client"

import CustomButton from '@/components/customButton/CustomButton'
import SearchbarCompo from '@/components/searchBar/SearchBarCompo'
import BasicTabs from '@/components/tabComponent/BasicTab'
import StickyHeadTable from '@/components/tableOneComponent/StickyHeadTable'
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Switch from '@mui/material/Switch';
import DropDown from '@/components/dropDown/DropDown'
import CheckBoxDropDown from '@/components/checkBoxDropDown/CheckBoxDropDown'
import DialogBox from '@/components/DialogBox/DialogBox'
import QuestionTableComponent from '@/components/questionTableComponent/QuestionTableComponent'
import DropDownQuest from '../dropDownQuest/DropDownQuest'
import AddQuestionToSurveyDrwar from '../addQuestionToSurveyDrawer/AddQuestionToSurveyDrwaer'
import SurveyQuestionTable from '../surveyQuestionTable/SurveyQuestionTable'
import { useAppDispatch } from '@/store/hooks'
import { get_question_of_survey } from '@/slice/question/question_action'
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function QuestionTab() {
    
    // const handldeOnClick=()=>{

    // }
    const dummyOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ];
  return (
    <Box>
    <Box sx={{
        display:"flex",
        justifyContent:"space-between"
    }}>
        <Typography sx={{
            fontSize:"22px",
            fontWeight:"600",
            fontFamily:""
        }}>Questions List</Typography>
        {/* <CustomButton text='CREATE' onClick={handldeOnClick}/> */}
        <Box sx={{
            display:"flex",
            gap:"20px"
        }}> 
            <Button variant='outlined'>
                Add
            </Button>
            <AddQuestionToSurveyDrwar/>
            <DialogBox/></Box>
    </Box>
    <Box sx={{
        bgcolor:"white",
        borderRadius:"5px"
    }}><Box sx={{
        padding:"30px",
        marginTop:"20px"
    }}>
        
        <Box sx={{
            display:"flex",
            justifyContent:"space-between"
        }}>
            <Box sx={{
                display:"flex",
                gap:"30px"
                
            }}>
            <SearchbarCompo/>
            {/* <DropDown/> */}
            <DropDownQuest options={dummyOptions} value={dummyOptions.value}/>
            <CheckBoxDropDown/>
            <Button>Clear</Button>

            </Box>
            <Box sx={{
                display:"flex",
                alignItems:"center"
            }}>
            <Switch {...label} aria-label='Show deleted' />
              <Typography>Show deleted</Typography>
            </Box>
        </Box>
       {/* <StickyHeadTable/> */}
       <SurveyQuestionTable/>
    </Box>
    </Box>
    </Box>
  )
}
