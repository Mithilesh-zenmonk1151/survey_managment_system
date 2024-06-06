import { createSlice } from "@reduxjs/toolkit";
import { create_question, get_question, get_question_for_survey, get_question_of_survey, get_question_thr_id, update_question } from "./question_action";
import get_question_of_survey_service from "@/services/question_service/get_question_of_survey";

type initialStateProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  content: any;
  page_number:number;
  page_limit:number;

  error: Object | null;
};

const initialState: initialStateProps = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  content: {
    message: "",
    question: {
      description: "",
      id: 0,
      abbr: "",
      question_type_id: 0,
      active: false,
    },
  },
  page_number: 1,
  page_limit: 10,
};

export const question_slice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_question.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get_question.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
    });
    builder.addCase(get_question.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(get_question_for_survey.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get_question_for_survey.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
    });
    builder.addCase(get_question_for_survey.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(get_question_of_survey.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get_question_of_survey.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload.response;
      console.log("SSSSSSTATE]]]]]]]]]]]]]]]]]",state.content)
    });
    builder.addCase(get_question_of_survey.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(create_question.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(create_question.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(create_question.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(update_question.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(update_question.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedQuestion = action.payload;
      if (state.content.questions?.id === updatedQuestion.id) {
        state.content.question = updatedQuestion;
      }
    });
    builder.addCase(update_question.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default question_slice.reducer;
