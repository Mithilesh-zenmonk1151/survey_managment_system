"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import DataTable from "../tableOneComponent/StickyHeadTable";

interface TabContent {
  id: string;
  label: string;
  content: JSX.Element;
}
const MyTabsComponent = () => {
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
      content: <DataTable onAddTab={handleAddTab} />,
    },
  ]);
  const [value, setValue] = useState(0);

  //

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab key={tab.id} label={tab.label} />
        ))}
      </Tabs>
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
  );
};

export default MyTabsComponent;
