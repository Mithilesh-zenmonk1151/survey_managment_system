"use client"
import DialogBoxSurvey from '@/components/DialogBoxSurvey/DialogBoxSurvey'
import CustomButton from '@/components/customButton/CustomButton'
import MyTabsComponent from '@/components/myTabComponent/MyTabComponent'
import MyTabsComponentS from '@/components/tabComponent/BasicTab'
import BasicTabs from '@/components/tabComponent/BasicTab'
import DataTable from '@/components/tableOneComponent/StickyHeadTable'
// /?/ import MyTabsComponent from '@/components/tableOneComponent/StickyHeadTable'
import { get_question_type } from '@/slice/question_type/question_type_action'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
export default function Surveypage() {
    const dispatch= useAppDispatch();
    const handldeOnClick=()=>{
    }
    useEffect(()=>{
        dispatch(get_question_type());
    },[dispatch]);
    const question_type= useAppSelector((state)=>state.question_type?.content);
    console.log("states",question_type);
  return (
   <Box sx={{
    display:"flex",
    flexDirection:"column",
    gap:"24px"
   }}>
    <Box sx={{
        display:"flex",
        justifyContent:"space-between",
        gap:"30px"
    }}>
        <Typography sx={{
            fontSize:"20px",
            fontWeight:"500",
            fontFamily:""
        }}>Surveys List</Typography>
       <Box> <DialogBoxSurvey/></Box>
    </Box>
    <Box >
        {/* <BasicTabs/> */}
        {/* <MyTabsComponent/> */}
        {/* <DataTable/> */}
        {/* <MyTabsComponentS/> */}
        <MyTabsComponent/>
    </Box>
   </Box>
  )
}
