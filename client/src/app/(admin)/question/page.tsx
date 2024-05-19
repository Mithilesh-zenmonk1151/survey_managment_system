"use client"

import CustomButton from '@/components/customButton/CustomButton'
import SearchbarCompo from '@/components/searchBar/SearchBarCompo'
import BasicTabs from '@/components/tabComponent/BasicTab'
import StickyHeadTable from '@/components/tableOneComponent/StickyHeadTable'
import { Box, Typography } from '@mui/material'
import React from 'react'
import Switch from '@mui/material/Switch';
import DropDown from '@/components/dropDown/DropDown'
import CheckBoxDropDown from '@/components/checkBoxDropDown/CheckBoxDropDown'
import DialogBox from '@/components/DialogBox/DialogBox'
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function QuestionPage() {
    // const handldeOnClick=()=>{

    // }
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
        }}>Questions List</Typography>
        {/* <CustomButton text='CREATE' onClick={handldeOnClick}/> */}
        <Box><DialogBox/></Box>
    </Box>
    <Box sx={{
        bgcolor:"white",
        borderRadius:"5px"
    }}><Box sx={{
        padding:"20px"
    }}>
        
        <Box sx={{
            display:"flex",
            justifyContent:"space-between"
        }}>
            <Box sx={{
                display:"flex",
                
            }}>
            <SearchbarCompo/>
            {/* <DropDown/> */}
            <CheckBoxDropDown/>
            {/* <DropDown/> */}

            </Box>
            <Switch {...label} />
        </Box>
       <StickyHeadTable/>
    </Box>
    </Box>
    </Box>
  )
}
