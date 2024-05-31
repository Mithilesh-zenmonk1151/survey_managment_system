"use client"
import React, { useState } from "react";
import { Box, Button, Typography, Switch } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import DialogBox from '@/components/DialogBox/DialogBox';
import SearchbarCompo from '@/components/searchBar/SearchBarCompo';
import SearchingDropDown from '@/components/searchingDropDown/SearchingDropDown';
import QuestionTableComponent from '@/components/questionTableComponent/QuestionTableComponent';
import CheckBoxDropDown from "@/components/checkBoxDropDown/CheckBoxDropDown";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const QuestionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [checkSelectedType,setCheckSelectedType]=useState("");
  const question_type = useAppSelector((state) => state.question_type?.content?.response) || [];
  const abbr= useAppSelector((state)=>state.questions?.content?.response?.data?.rows);
  // const abbrs: string[] = abbr?.map(item => item.abbr);
    // console.log("AAAAAXCNHJHBJBBHJBJBNBN",abbrs)
  console.log("***(&(***(",selectedType);
  const clearAll=()=>{
    setSearchTerm("");
    setSelectedType("");
    setCheckSelectedType("");
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
          Questions List
        </Typography>
        <Box>
          <DialogBox />
        </Box>
      </Box>
      <Box sx={{ bgcolor: "white", borderRadius: "5px" }}>
        <Box sx={{ padding: "30px", marginTop: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: "30px" ,alignItems:"center"}}>
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
              <CheckBoxDropDown select_type="abbriviation" options={abbr} em_name="Abbriviation" em="Abbriviation" onChange={(value)=>setCheckSelectedType(value)}/>
              <Button onClick={clearAll}>Clear</Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Switch {...label} aria-label='Show deleted' />
              <Typography>Show deleted</Typography>
            </Box>
          </Box>
          <QuestionTableComponent searchTerm={searchTerm} selectedType={selectedType}  checkSelectedType={checkSelectedType} />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionPage;
