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