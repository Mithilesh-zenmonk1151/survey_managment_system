"use client"

import CustomButton from '@/components/customButton/CustomButton'
import SearchbarCompo from '@/components/searchBar/SearchBarCompo'
import BasicTabs from '@/components/tabComponent/BasicTab'
import StickyHeadTable from '@/components/tableOneComponent/StickyHeadTable'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Switch from '@mui/material/Switch';
import DropDown from '@/components/dropDown/DropDown'
import CheckBoxDropDown from '@/components/checkBoxDropDown/CheckBoxDropDown'
import DialogBox from '@/components/DialogBox/DialogBox'
import QuestionTableComponent from '@/components/questionTableComponent/QuestionTableComponent'
import DropDownQuest from '@/components/dropDownQuest/DropDownQuest'
import SearchingDropDown from '@/components/searchingDropDown/SearchingDropDown'
import { useAppSelector } from '@/store/hooks'
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function QuestionPage() {
    // const handldeOnClick=()=>{

    
      const question_type= useAppSelector((state)=>state.question_type?.content?.response);
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
        <Box><DialogBox/></Box>
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
            <SearchbarCompo />
            {/* <DropDown/> */}
            <SearchingDropDown options={question_type} em_name='Type' em='Type'/>
            <CheckBoxDropDown/>

            {/* <DropDown/> */}
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
       <QuestionTableComponent/>
    </Box>
    </Box>
    </Box>
  )
}
