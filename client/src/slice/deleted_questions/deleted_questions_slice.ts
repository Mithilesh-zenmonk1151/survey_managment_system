import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get_deleted_questions } from "./deleted_questions_action";

interface QuestionsState {
    deletedQuestions: any[]; 
    loading: boolean;
    error: string | null;
  }
  
  const initialState: QuestionsState = {
    deletedQuestions: [],
    loading: false,
    error: null,
  };
  
  export const questions_deleted_slice = createSlice({
    name: 'deleted_questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(get_deleted_questions.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        builder.addCase(get_deleted_questions.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.deletedQuestions = action.payload;
        })
        builder.addCase(get_deleted_questions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  export default questions_deleted_slice.reducer;