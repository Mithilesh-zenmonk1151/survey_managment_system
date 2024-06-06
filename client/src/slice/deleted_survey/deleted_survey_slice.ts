import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get_deleted_survey } from './deleted_survey_action';

interface QuestionsState {
    deletedSurvey: any[]; 
    loading: boolean;
    error: string | null;
  }
  
  const initialState: QuestionsState = {
    deletedSurvey: [],
    loading: false,
    error: null,
  };
  
  export const questions_deleted_slice = createSlice({
    name: 'deleted_survey',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(get_deleted_survey.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        builder.addCase(get_deleted_survey.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.deletedSurvey = action.payload;
        })
        builder.addCase(get_deleted_survey.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  export default questions_deleted_slice.reducer;