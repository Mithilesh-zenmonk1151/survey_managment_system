import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import { get_survey_type_type,post_survey_type_type } from "./survey_type_type";
import post_survey_type_service from "@/services/survey_type_service/post_survey_type";
import get_survey_type_service from "@/services/survey_type_service/get_survey_type";
export const post_survey_type = createAsyncThunk(
 post_survey_type_type,
  async (survey_type:{name:string,abbr:string}, { rejectWithValue }) => {
    try {
      const response = await post_survey_type_service(survey_type);
      const data = response?.data;
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const get_survey_type = createAsyncThunk(
  get_survey_type_type,
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_survey_type_service();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);