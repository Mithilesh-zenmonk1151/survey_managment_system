
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SurveyQuestion {
  survey_id: number;
  question_id: number[];
  num: number;
}

interface SurveyQuestionsState {
  surveyQuestions: SurveyQuestion[];
}

const initialState: SurveyQuestionsState = {
  surveyQuestions: [],
};

const surveyQuestionsSlice = createSlice({
  name: 'surveyQuestions',
  initialState,
  reducers: {
    addSurveyQuestion(state, action: PayloadAction<SurveyQuestion>) {
        state.surveyQuestions.push(action.payload);
    },
   
  },
});

export const { addSurveyQuestion } = surveyQuestionsSlice.actions;
export default surveyQuestionsSlice.reducer;
