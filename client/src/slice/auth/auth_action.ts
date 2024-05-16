import { createAsyncThunk } from '@reduxjs/toolkit'
import { login_type, signup_type } from './auth_type'
import type {FieldValues} from "react-hook-form";
import register_service  from '@/services/auth_service/signup_service/signup_service';
import login_service from '@/services/auth_service/login_service/login_service';
export const register_users = createAsyncThunk(signup_type, async(user:{full_name:string,email:string,password:string,confirm_password:string}, {rejectWithValue}) => {
    try {
        console.log("Slice wala user During signup",user);
        console.log("Hello world");
      
        const response = await register_service({email:user.email,password:user.password, full_name:user.full_name,confirm_passwword:user.confirm_password})
        const data = response?.data;
        console.log(data);
        return data
    } catch (err) {
        console.log(err)
        return rejectWithValue(err)
    }
})
export const login_users = createAsyncThunk(login_type, async (user:{email:string,password:string}, {rejectWithValue}) => {
    try{
        console.log("SSSLICCCEEEE UUSSERRS",user)
        const response = await login_service({email:user.email,password:user.password})
        const data = await response.data
        console.log(data)
        
        const token=data?.loginData?.token
        console.log("Datattaatat=======",data);
        localStorage.setItem("logged", "true");
        localStorage.setItem("token", token);
    
        console.log("data Loggin wala data tTTTToken ke liye",token)
      
        return data
    }catch(err) {
        console.log(err)
        return rejectWithValue(err)
    }
})