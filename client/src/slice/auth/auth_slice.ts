import {createSlice} from '@reduxjs/toolkit'
import { login_users, register_users } from './auth_action'

type initialStateProps = {
    isLoading: boolean;
    isLoggedIn: boolean
    content: {
      message: string;
      user: {
        full_name:string;
        email: string;
        name: string;
        id: number;
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
      user: {
        email: '',
        name: '',
        id: 0,
        full_name:""
      },
    
    },
  };

export const auth_slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login_users.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login_users.fulfilled, (state, action) => {
            state.isLoading = false
            state.content = action.payload

        })
        builder.addCase(login_users.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
        builder.addCase(register_users.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(register_users.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(register_users.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    }
})

export default auth_slice.reducer