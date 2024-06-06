import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const get_deleted_survey = createAsyncThunk(
    'questions/get_question',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:4000/api/survey/deleted', {
       
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
  
export const delete_survey = createAsyncThunk(
  'question/delteQuestions',
  async (survey_id: number , { rejectWithValue }) => {
    try {
      const response= await axios.delete(
        `http://localhost:4000/api/survey/${survey_id}`
      );
      // const response = await get_question_of_survey_service(survey_id);
      const data=await response?.data
      return data; 
    } catch (err:any) {
      return rejectWithValue(err.response.data); 
    }
  }
);