import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import { get_question_type_type,post_question_type_type } from "./question_type_type";
// import getTestsService from "@/services/test/gettestservice";
import get_question_type_service from "@/services/question_type/get_question_type";
import post_question_type_service from "@/services/question_type/post_question_type";
// import loginService from "@/service/Auth/register.service";
export const create_question_type = createAsyncThunk(
 post_question_type_type,
  async (question_type:{name:string,abbr:string}, { rejectWithValue }) => {
    try {
      // console.log("Slice wala teststssss",test);
      const response = await post_question_type_service(question_type);
      const data = response?.data;
      console.log("data car added from slice===",data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const get_question_type = createAsyncThunk(
  get_question_type_type,
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_question_type_service();
      console.log('Response===========slice Question',response);
      return response;
    } catch (err) {
      console.log("error In getting  question Yype")
      return rejectWithValue(err);
    }
  }
);