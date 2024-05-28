"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Button, Switch, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import DataTable from "../tableOneComponent/StickyHeadTable";
import SearchbarCompo from "../searchBar/SearchBarCompo";
import SearchingDropDown from "../searchingDropDown/SearchingDropDown";
import CheckBoxDropDown from "../checkBoxDropDown/CheckBoxDropDown";

interface TabContent {
  id: string;
  label: string;
  content: JSX.Element;
}
const names = [
 {name:'Oliver Hansen'},
 {name:'Oliver Hansen'},
 {name:'Oliver Hansen'},
 {name:'Oliver Hansen'},
 {name:'Oliver Hansen'},
 {name:'Oliver Hansen'},
 
];
const MyTabsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const handleAddTab = (newTab: TabContent) => {
    const newTabs = [...tabs, newTab];
    if (newTabs.length > 3) {
      newTabs.shift();
    }
    setTabs(newTabs);
    setValue(newTabs.length - 1);
  };

  const [tabs, setTabs] = useState<TabContent[]>([
    {
      id: "main",
      label: "Surveys",
      content: <DataTable onAddTab={handleAddTab} searchTerm={searchTerm} selectedType={selectedType} />,
    },
  ]);
  const [value, setValue] = useState(0);

  //

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} sx={{
        bgcolor:"white",
        fontSize:"10px"
      }}>
        {tabs.map((tab, index) => (
          <Tab key={tab.id} label={tab.label} sx={{
            bgcolor:"white",
            fontSize:"14px",
            padding:0
          }}/>
        ))}
      </Tabs>
      <Box sx={{
        height:"1px",
        width:"100%",
        
      }}>

      </Box>
      <Box sx={{
        bgcolor:"white",
      }}>
        <Box sx={{
          display:"flex",
          justifyContent:"space-between",
          // paddingRight:"24px",
          // paddingLeft:"24px",
          padding:"24px"

        }}>
       <Box sx={{
        display:"flex",
        alignItems:"center"
       }}>
       <SearchbarCompo customPlaceHolder="Search......" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
        <SearchingDropDown options={names} em="Type" em_name="Type"/>
        <CheckBoxDropDown em_name="Abbreviation" options={names}/>
        <SearchingDropDown options={names} em="Status" em_name="Status"/>
        <Button disabled>Clear</Button>
       </Box>
       <Box sx={{
        display:"flex",
        alignContent:"center",
        alignItems:"center",
        textAlign:"center"
       }}>
        <Switch/>
        <Typography>Show deleted</Typography>
       </Box>
        </Box>

      {tabs.map((tab, index) => (
        <Box
          key={tab.id}
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}

        >
          {value === index && <Box>{tab.content}</Box>}
        </Box>
      ))}
            </Box>

    </Box>
  );
};

export default MyTabsComponent;
