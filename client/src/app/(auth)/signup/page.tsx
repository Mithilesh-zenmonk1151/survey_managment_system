 "use client"
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import style from "@/app/ui/auth.module.css"
import TextFieldCompo from '@/components/textField/TextFieldCompo'
import { useAppDispatch } from '@/store/hooks'
import { register_users } from '@/slice/auth/auth_action'
import toast from 'react-hot-toast'

export default function SignUpPage() {
  const [full_name,set_full_name]=useState("");
    const [email,set_email]= useState("");
    const [password,set_password]=useState("");
    const [confirm_password,set_confirm_password]=useState("");
    const [role,setRole]= useState("");
    const user={full_name,email,password,confirm_password};
    const dispatch= useAppDispatch();
    console.log("useerrr===",user)

    const handleOnClick=()=>{
        try{
          console.log("USSSSEEERRR===",user);
          dispatch(register_users(user));
          toast.success("User signup successfully")


        }
        catch(error){
          console.log("error come while we are going to register new user");
        }
    }



  return (
   <Box className={style.main_body} >
    <Typography>SignUp</Typography>
    <Box sx={{
      bgcolor:"white",
      height:"470px",
      width:"400px",
      
      

    }}>
      <Box>
      <TextFieldCompo placeholder='Enter your full name' value={full_name} label='Full name' type='text' name='firstName' nameT='firstNamer' customClassName='' setValue={set_full_name}/>
        <TextFieldCompo placeholder='Enter your email here' value={email} label='Email' type='email' name='email' nameT='email' customClassName='' setValue={set_email}/>
        <TextFieldCompo placeholder='Enter Password eg:-abc@22' value={password} label='Password' type='password' name='password' nameT='password' customClassName='' setValue={set_password}/>
        <TextFieldCompo placeholder='confirm Password' value={confirm_password} label="Confirm Passsword" type='text' name='lastName' nameT='lastName' customClassName='' setValue={set_confirm_password}/>
        <Button onClick={handleOnClick}>Signup</Button>


        
      </Box>

    </Box>
   </Box>
  )
}
