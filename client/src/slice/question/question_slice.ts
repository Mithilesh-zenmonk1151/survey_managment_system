import { createSlice } from "@reduxjs/toolkit";
import { create_question, get_question, get_question_of_survey, get_question_thr_id,  update_question } from "./question_action";

type initialStateProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  content: {
    message: string;
    question: {
      description: string;
      id: number;
      abbr: string;
      question_type_id: number;
      active: boolean;
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
    question: {
      description: "",
      id: 0,
      abbr: "",
      question_type_id: 0,
      active: false,
    },
  },
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
      console.log("action.payload", action.payload);
    });
    builder.addCase(get_question.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(get_question_thr_id.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get_question_thr_id.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
      console.log("action.payload", action.payload);
    });
    builder.addCase(get_question_thr_id.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(get_question_of_survey.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get_question_of_survey.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
      console.log("action.payload", action.payload);
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
    if (state.content.question.id === updatedQuestion.id) {
      state.content.question = updatedQuestion;
    }
  });
  builder.addCase(update_question.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error;
  });
},
});

export default question_slice.reducer;
