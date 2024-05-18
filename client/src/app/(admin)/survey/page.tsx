"use client"
import CustomButton from '@/components/customButton/CustomButton'
import BasicTabs from '@/components/tabComponent/BasicTab'
import { useAppSelector } from '@/store/hooks'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function page() {
    const handldeOnClick=()=>{

    }
    const question_type= useAppSelector((state)=>state);


    console.log("Use Selef",question_type);
    
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
