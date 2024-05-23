import { createSlice } from "@reduxjs/toolkit";
import { create_survey, get_survey, update_survey } from "./survey_action";

type initialStateProps = {
  isLoading: boolean;
  isLoggedIn: boolean;
  content: {
    message: string;
    survey: {
      name: string;
      id: number;
      abbr: string;
      survey_type_id: number;
      is_published: boolean;
      options:{
        modality:string;
        languages:string;
      }
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
    survey: {
      name: "",
      id: 0,
      abbr: "",
      survey_type_id: 0,
      is_published: false,
      options:{
        modality:"",
        languages:"",
      }
    },
  },
};

export const survey_slice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_survey.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(get_survey.fulfilled, (state, action) => {
      state.isLoading = false;
      state.content = action.payload;
      console.log("action.payload", action.payload);
    });
    builder.addCase(get_survey.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(create_survey.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(create_survey.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(create_survey.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(update_survey.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(update_survey.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedQuestion = action.payload;
      
    });
    builder.addCase(update_survey.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default survey_slice.reducer;
