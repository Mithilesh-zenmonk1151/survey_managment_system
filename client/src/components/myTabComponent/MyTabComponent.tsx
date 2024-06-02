import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Switch, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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
  { name: 'Oliver Hansen' },
  { name: 'Oliver Hansen' },
  { name: 'Oliver Hansen' },
  { name: 'Oliver Hansen' },
  { name: 'Oliver Hansen' },
  { name: 'Oliver Hansen' },
];

const MyTabsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const router = useRouter();

  const [additionalTabs, setAdditionalTabs] = useState<TabContent[]>([]);
  const [value, setValue] = useState(0);

  const handleAddTab = (newTab: TabContent) => {
    setAdditionalTabs((prevTabs) => {
      const isDuplicate = prevTabs.some((tab) => tab.id === newTab.id);
      if (isDuplicate) {
        return prevTabs; // If the tab is a duplicate, do not add it
      }

      const updatedTabs = [...prevTabs, newTab];
      if (updatedTabs.length > 3) {
        updatedTabs.shift(); // Remove the oldest tab if more than three additional tabs
      }
      setValue(updatedTabs.length); // Set the new tab as active
      router.push(`?${newTab.id}`);
      return updatedTabs;
    });
  };

  const handleRemoveTab = (index: number) => {
    setAdditionalTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((_, i) => i !== index);
      setValue(value > index ? value - 1 : value);
      return updatedTabs;
    });
  };

  const tabs = [
    {
      id: "main",
      label: "Surveys",
      content: <DataTable onAddTab={handleAddTab} searchTerm={searchTerm} selectedType={selectedType} />,
    },
    ...additionalTabs,
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(`?${tabs[newValue].id}`);
  };

  return (
    <Box sx={{}}>
      <Tabs value={value} onChange={handleChange} sx={{ bgcolor: "white", fontSize: "50px", display: "flex", gap: "20px", fontFamily: "Arial, sans-serif" }}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {tab.label}
                {tab.id !== "main" && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTab(index - 1);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            }
            sx={{ bgcolor: "white", fontSize: "14px", padding: 0 }}
          />
        ))}
      </Tabs>
      <Box sx={{ height: "1px", width: "100%" }}></Box>
      <Box sx={{ bgcolor: "white" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "24px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchbarCompo customPlaceHolder="Search......" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <SearchingDropDown options={names} em="Type" em_name="Type" />
            <CheckBoxDropDown em_name="Abbreviation" options={names} />
            <SearchingDropDown options={names} em="Status" em_name="Status" />
            <Button disabled>Clear</Button>
          </Box>
          <Box sx={{ display: "flex", alignContent: "center", alignItems: "center", textAlign: "center" }}>
            <Switch />
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
            sx={{
              // marginLeft:"50px"
            }}
          >
            {value === index && <Box>{tab.content}</Box>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MyTabsComponent;
