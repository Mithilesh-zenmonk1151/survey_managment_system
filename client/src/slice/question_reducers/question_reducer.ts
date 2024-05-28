// src/features/questions/questionsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  id: number;
  description: string;
  abbr: string;
}

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    addQuestion(state, action: PayloadAction<Question>) {
        console.log("safdgdfgfdkg",action.payload);
      state.questions.push(action.payload);
    },
    deleteQuestion(state, action: PayloadAction<number>) {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },
  },
});

export const { setQuestions, addQuestion, deleteQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
