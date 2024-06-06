import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import { get_survey_question_type, post_survey_question_type, put_survey_question_type } from "./survey_question_type";
import post_survey_question_service from "@/services/survey_question_service/post_survey_question";
import put_survey_question_service from "@/services/survey_question_service/put_survey_question";
import axios from "axios";
export const create_survey_question = createAsyncThunk(
 post_survey_question_type,
  async (survey_question:{survey_id:number,question_id:number[],order:number}, { rejectWithValue }) => {
    try {
      // console.log("Slice wala teststssss",test);
      const response = await post_survey_question_service(survey_question);
      const data = response?.data;
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
export const update_survey_question = createAsyncThunk(
  put_survey_question_type,
  async ( survey_question: { question_id: number, survey_id:number,question_description:string}, { rejectWithValue }) => {
      try {
          const response = await put_survey_question_service(survey_question);
          const data = response?.data;
          return data;
      } catch (err) {
          console.log(err);
          return rejectWithValue(err);
      }
  }
);
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

// /page/${id1}/${id2}
// export const get_question_for_survey = createAsyncThunk(
//   'survey/getQuestionOfSurvey',
//   async (survey_id: string , { rejectWithValue }) => {
//     try {
//       console.log("Survey ID of survey question$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:", survey_id);
//       const response= await axios.get(
//         `http://localhost:4000/api/question/survey_question/${survey_id}`
//       );
//       // const response = await get_question_of_survey_service(survey_id);
//       console.log('Response from Question70687689067890769077########## get:', response);
//       console.log("464646565656556",response);
//       const data=await response?.data
//       return data; 
//     } catch (err:any) {
//       console.log("Error in getting questions of survey");
//       return rejectWithValue(err.response.data); 
//     }
//   }
// );
interface DeleteQuestionParams {
  survey_id: number;
  question_id: number;
}

export const delete_question_of_survey = createAsyncThunk(
  'survey/deleteQuestionOfSurvey',
  async ({ survey_id, question_id }: DeleteQuestionParams, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/survey_question/${survey_id}/${question_id}`
      );
      return { survey_id, question_id };
    } catch (err: any) {
      console.error("Error in deleting question of survey");
      return rejectWithValue(err.response.data);
    }
  }
);

