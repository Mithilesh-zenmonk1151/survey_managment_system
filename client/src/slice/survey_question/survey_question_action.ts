import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import { get_survey_question_type, post_survey_question_type } from "./survey_question_type";
import post_survey_question_service from "@/services/survey_question_service/post_survey_question";
export const create_survey_question = createAsyncThunk(
 post_survey_question_type,
  async (survey_question:{survey_id:number,question_id:number[],order:number}, { rejectWithValue }) => {
    try {
      // console.log("Slice wala teststssss",test);
      const response = await post_survey_question_service(survey_question);
      const data = response?.data;
      console.log("data survey_question added from slice===",data);
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

// export const get_survey = createAsyncThunk(
//   get_survey_question_type,
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await get_survey_ques();
//       console.log('Response===========slice Question',response);
//       return response;
//     } catch (err) {
//       console.log("error In getting  question Yype")
//       return rejectWithValue(err);
//     }
//   }
// );
// export const update_survey = createAsyncThunk(
//   put_survey_type,
//   async ( survey: { id: number, is_published:boolean}, { rejectWithValue }) => {
//       try {
//           const response = await put_survey_service(survey);
//           const data = response?.data;
//           console.log("data survey updated from slice===", data);
//           return data;
//       } catch (err) {
//           console.log(err);
//           return rejectWithValue(err);
//       }
//   }
// );
// export const put_survey = createAsyncThunk(
//   update_survey_type,
//   async (survey:{name:string,survey_type_id:number,id:number,options:{modality:string,languages:string}}, { rejectWithValue }) => {
//       try {
//           const response = await update_survey_service(survey);
//           const data = response?.data;
//           console.log("data survey updated from slice===", data);
//           return data;
//       } catch (err) {
//           console.log(err);
//           return rejectWithValue(err);
//       }
//   }
// );