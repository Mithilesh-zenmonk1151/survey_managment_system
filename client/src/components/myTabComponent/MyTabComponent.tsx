import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Switch, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";
import DataTable from "../tableOneComponent/StickyHeadTable"; // Adjust import path if necessary
import SearchbarCompo from "../searchBar/SearchBarCompo";
import SearchingDropDown from "../searchingDropDown/SearchingDropDown";
import CheckBoxDropDown from "../checkBoxDropDown/CheckBoxDropDown";
import { useAppSelector } from "@/store/hooks";

interface TabContent {
  id: string;
  label: string;
  content: JSX.Element;
}

const MyTabsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [checkSelectedType, setCheckSelectedType] = useState("");
  const [selectedPublishedType, setSelectedPublishedType] = useState("");
  const [additionalTabs, setAdditionalTabs] = useState<TabContent[]>([]);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [showDeleted, setShowDeleted] = useState(false);

  const survey_type = useAppSelector((state) => state.survey_type?.content?.response) || [];
  const abbr = useAppSelector((state) => state.survey?.content?.response?.data?.rows) || [];

  const handleAddTab = (newTab: TabContent) => {
    setAdditionalTabs((prevTabs) => {
      const existingTabIndex = prevTabs.findIndex((tab) => tab.id === newTab.id);
      if (existingTabIndex !== -1) {
        setValue(existingTabIndex + 1);
        router.push(`?${newTab.id}`);
        return prevTabs;
      }

      const updatedTabs = [...prevTabs, newTab];
      if (updatedTabs.length > 3) {
        updatedTabs.shift();
      }
      setValue(updatedTabs.length);
      router.push(`?${newTab.id}`);
      return updatedTabs;
    });
  };

  const status = [
    { name: 'Published' },
    { name: 'Unpublished' },
  ];

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
      content: <DataTable
        onAddTab={handleAddTab}
        checkSelectedType={checkSelectedType}
        searchTerm={searchTerm}
        selectedType={selectedType}
        is_published={selectedPublishedType}
        showDeleted={showDeleted}
      />,
    },
    ...additionalTabs,
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(`?${tabs[newValue].id}`);
  };

  const handleOnClearClick = () => {
    setSearchTerm("");
    setSelectedType("");
    setCheckSelectedType("");
    setSelectedPublishedType("");
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          bgcolor: "white",
          fontSize: "50px",
          display: "flex",
          gap: "20px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: "800",
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: "14px",
                  paddingLeft: "20px",
                  fontWeight: "600",
                  fontFamily: "Open Sans, sans-serif",
                  color:"#424242"
                  
                }}
              >
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
        {value === 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}>
              <SearchbarCompo
                customPlaceHolder="Search......"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchingDropDown
                select_type=""
                value={selectedType}
                onChange={(value) => setSelectedType(value)}
                options={survey_type}
                em="Type"
                em_name="Type"
              />
              <CheckBoxDropDown
                select_type="abbreviation"
                options={abbr}
                em_name="Abbreviation"
                em="Abbreviation"
                onChange={(value) => setCheckSelectedType(value)}
              />
              <SearchingDropDown
                select_type=""
                onChange={(value) => setSelectedPublishedType(value)}
                options={status}
                em="Status"
                em_name="Status"
              />
              <Button onClick={handleOnClearClick}>Clear</Button>
            </Box>
            <Box sx={{ display: "flex", alignContent: "center", alignItems: "center", textAlign: "center" }}>
              <Switch checked={showDeleted}
                onChange={() => setShowDeleted(!showDeleted)}
                inputProps={{ "aria-label": "Show deleted" }} />
              <Typography>Show deleted</Typography>
            </Box>
          </Box>
        )}

        {tabs.map((tab, index) => (
          <Box
            key={tab.id}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{ marginLeft: "50px" }}
          >
            {value === index && <Box>{tab.content}</Box>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MyTabsComponent;
