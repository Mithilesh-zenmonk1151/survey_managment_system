import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import get_question_type_service from "@/services/question_type/get_question_type";
import post_question_type_service from "@/services/question_type/post_question_type";
import { post_question_type,get_question_type, put_question_type, get_question_thr_id_type, get_question_of_survey_type } from "./question_type";
import get_question_service from "@/services/question_service/get_question";
import post_question_service from "@/services/question_service/post_question";
import put_question_service from "@/services/question_service/put_question";
import get_question_thr_id_service from "@/services/question_service/get_question_thr_id";
import get_question_of_survey_service from "@/services/question_service/get_question_of_survey";
import axios from "axios";
export const create_question = createAsyncThunk(
 post_question_type,
  async (question:{description:string,abbr:string,question_type_id:number,active:boolean}, { rejectWithValue }) => {
    try {
      // console.log("Slice wala teststssss",test);
      const response = await post_question_service(question)
      const data = response?.data;
      // console.log("data car added from slice===",data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const get_question = createAsyncThunk(
  get_question_type,
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_question_service();
      // console.log('Response===========slice Question',response);
      return response;
    } catch (err) {
      console.log("error In getting  question Yype")
      return rejectWithValue(err);
    }
  }
);
export const update_question = createAsyncThunk(
  put_question_type,
  async ( question : { id: number, description:string}, { rejectWithValue }) => {
      try {
          const response = await put_question_service( question);
          const data = response?.data;
          // console.log("data car updated from slice===", data);
          return data;
      } catch (err) {
          console.log(err);
          return rejectWithValue(err);
      }
  }
);
export const get_question_thr_id = createAsyncThunk(
  get_question_thr_id_type,
  async (question : { id: number}, { rejectWithValue }) => {
    try {
      const response = await get_question_thr_id_service(question);
      // console.log('Response===========slice Question',response);
      return response;
    } catch (err) {
      console.log("error In getting  question Yype")
      return rejectWithValue(err);
    }
  }
);
export const get_question_of_survey = createAsyncThunk(
  'survey/getQuestionOfSurvey',
  async (survey_id: string , { rejectWithValue }) => {
    try {
      console.log("Survey ID of survey question$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:", survey_id);
      const response= await axios.get(
        `http://localhost:4000/api/question/question_of_survey/${survey_id}`
      );
      // const response = await get_question_of_survey_service(survey_id);
      console.log('Response from Question70687689067890769077########## get:', response);
      console.log("464646565656556",response);
      const data=await response?.data
      return data; 
    } catch (err:any) {
      console.log("Error in getting questions of survey");
      return rejectWithValue(err.response.data); 
    }
  }
);
export const get_question_for_survey = createAsyncThunk(
  'survey/getQuestionOfSurvey',
  async (survey_id: string , { rejectWithValue }) => {
    try {
      console.log("Survey ID of survey question$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:", survey_id);
      const response= await axios.get(
        `http://localhost:4000/api/question/survey_question/${survey_id}`
      );
      // const response = await get_question_of_survey_service(survey_id);
      console.log('Response from Question70687689067890769077########## get:', response);
      console.log("464646565656556",response);
      const data=await response?.data
      return data; 
    } catch (err:any) {
      console.log("Error in getting questions of survey");
      return rejectWithValue(err.response.data); 
    }
  }
);

