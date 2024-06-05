import { createSlice } from "@reduxjs/toolkit";
import { create_survey_question, get_question_of_survey } from "./survey_question_action";

type initialStateProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  content: {
    message: string;
    survey_question: {
      id: number;
      survey_id: number;
      question_id: number[];
      question_description: string;
      order: number;
    };
  };
  error: Object | null;
};

const initialState: initialStateProps = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  content: {
    message: "",
    survey_question: {
      id: 0,
      question_description: "",
      survey_id: 0,
      order: 0,
      question_id: [],
    },
  },
};

export const survey_question_slice = createSlice({
  name: "survey_question",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(get_survey.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(get_survey.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.content = action.payload;
    //   console.log("action.payload", action.payload);
    // });
    // builder.addCase(get_survey.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
    builder.addCase(create_survey_question.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(create_survey_question.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(create_survey_question.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // builder.addCase(update_survey.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(update_survey.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   const updatedQuestion = action.payload;
    //   if (state.content.survey.id === updatedQuestion.id) {
    //     state.content.survey = updatedQuestion;
    //   }
    // });
    // builder.addCase(update_survey.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error;
    // });
    builder.addCase(get_question_of_survey.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get_question_of_survey.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
    });
    builder.addCase(get_question_of_survey.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default survey_question_slice.reducer;
