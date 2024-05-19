"use client"
import CustomButton from '@/components/customButton/CustomButton'
import BasicTabs from '@/components/tabComponent/BasicTab'
import { get_question_type } from '@/slice/question_type/question_type_action'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'

export default function page() {
    const dispatch= useAppDispatch();
    const handldeOnClick=()=>{

    }


    useEffect(()=>{
        dispatch(get_question_type());
    

    },[dispatch]);
    const question_type= useAppSelector((state)=>state.question_type.content);
    console.log("states",question_type);


    
  return (
   <Box>
    <Box sx={{
        display:"flex",
        justifyContent:"space-between"
    }}>
        <Typography sx={{
            fontSize:"20px",
            fontWeight:"500",
            fontFamily:""
        }}>Surveys List</Typography>
        <CustomButton text='CREATE' onClick={handldeOnClick}/>
    </Box>
    <Box>
        <BasicTabs/>
    </Box>
   </Box>
  )
}
