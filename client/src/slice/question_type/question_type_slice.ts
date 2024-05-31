import {createSlice} from '@reduxjs/toolkit'
// import { login_users, register_users } from './auth_action'
import { get_question_type ,create_question_type} from './question_type_action';

type initialStateProps = {
    isLoading: boolean;
    isLoggedIn: boolean
    content: {
      message: string;
      question_type: {
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
      question_type: {
        name: '',
        id: 0,
        abbr: "",
      },
    
    },
  };

export const question_type_slice = createSlice({
    name: 'question_type',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(get_question_type.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(get_question_type.fulfilled, (state, action) => {
            state.isLoading = false
            state.content = action.payload

        })
        builder.addCase(get_question_type.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(create_question_type.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(create_question_type.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(create_question_type.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    }
})

export default question_type_slice.reducer