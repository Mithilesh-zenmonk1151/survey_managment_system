"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DialogBox from "@/components/DialogBox/DialogBox";
import SearchbarCompo from "@/components/searchBar/SearchBarCompo";
import SearchingDropDown from "@/components/searchingDropDown/SearchingDropDown";
import QuestionTableComponent from "@/components/questionTableComponent/QuestionTableComponent";
import CheckBoxDropDown from "@/components/checkBoxDropDown/CheckBoxDropDown";
import { get_deleted_questions } from "@/slice/deleted_questions/deleted_questions_action";

const label = { inputProps: { "aria-label": "Switch demo" } };

const QuestionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [checkSelectedType, setCheckSelectedType] = useState("");
  const question_type =
    useAppSelector((state) => state.question_type?.content?.response) || [];
  const abbr = useAppSelector(
    (state) => state.questions?.content?.response?.data
  );
  const dispatch = useAppDispatch();
  const [showDeleted, setShowDeleted] = useState(false);

  const clearAll = () => {
    setSearchTerm("");
    setSelectedType("");
    setCheckSelectedType("");
  };

  useEffect(() => {
    dispatch(get_deleted_questions());
  }, [dispatch]);

  const deletedQuestions = useAppSelector(
    (state) => state.deleted_questions?.deletedQuestions?.response?.data
  );

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
            <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
              <SearchbarCompo
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                customPlaceHolder="Search..."
                clearAll={clearAll}
              />

              <SearchingDropDown
                options={question_type}
                em_name="Type"
                em="Type"
                value={selectedType}
                select_type=""
                onChange={(value) => setSelectedType(value)}
                clearAll={clearAll}
              />
              <CheckBoxDropDown
                select_type="abbriviation"
                options={abbr}
                em_name="Abbriviation"
                em="Abbriviation"
                onChange={(value) => setCheckSelectedType(value)}
                clearAll={clearAll}
              />
              <Button onClick={clearAll}>Clear</Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Switch
                checked={showDeleted}
                onChange={() => setShowDeleted(!showDeleted)}
                inputProps={{ "aria-label": "Show deleted" }}
              />
              <Typography>Show deleted</Typography>
            </Box>
          </Box>
          <QuestionTableComponent
            showDeleted={showDeleted}
            searchTerm={searchTerm}
            selectedType={selectedType}
            checkSelectedType={checkSelectedType}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionPage;



















