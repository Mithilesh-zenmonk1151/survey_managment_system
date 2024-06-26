import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const get_deleted_questions = createAsyncThunk(
    'questions/get_question',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:4000/api/question/deleted_questions', {
       
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
export const delete_question = createAsyncThunk(
  'question/delteQuestions',
  async (question_id: number , { rejectWithValue }) => {
    try {
      const response= await axios.delete(
        `http://localhost:4000/api/question/${question_id}`
      );
      // const response = await get_question_of_survey_service(survey_id);
      const data=await response?.data
      return data; 
    } catch (err:any) {
      return rejectWithValue(err.response.data); 
    }
  }
);