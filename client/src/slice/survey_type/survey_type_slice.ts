import {createSlice} from '@reduxjs/toolkit'
import { get_survey_type, post_survey_type } from './survey_type_action';

type initialStateProps = {
    isLoading: boolean;
    isLoggedIn: boolean
    content: {
      message: string;
      survey_type: {
        name: string;
        id: number;
        abbr: string;
      };
      
    } 
    error: Object | null;
  };

  const initialState: initialStateProps = {
    isLoading: false,
    error: null,
    isLoggedIn: false,
    content: {
      message: '',
      survey_type: {
        name: '',
        id: 0,
        abbr: "",
      },
    
    },
  };

export const survey_type_slice = createSlice({
    name: 'question_type',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(get_survey_type.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(get_survey_type.fulfilled, (state, action) => {
            state.isLoading = false
            state.content = action.payload
            console.log("action.payload",action.payload)

        })
        builder.addCase(get_survey_type.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(post_survey_type.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(post_survey_type.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(post_survey_type.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    }
})

export default survey_type_slice.reducer