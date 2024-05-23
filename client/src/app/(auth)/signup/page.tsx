"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const Register = () => {

  const [errMsg, setErrMsg] = useState("");
  const router = useRouter()
  const {data: session, status: sessionStatus} = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/survey");
    }
  }, [sessionStatus, router]);
  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e .target[1].value

    if(!isValidEmail(email)){
      setErrMsg("Email invalid")
      return;
    }

    if(!password || password.length < 8) {
      setErrMsg("Password must be 8 character long")
      return;
    }
    const body = {
      email, 
      password
    }
    try{
      const res = await axios.post("/api/register", body)
      console.log(res)
      if(res?.status === 201){
        setErrMsg("")
        router.push("/login")
      }
    }
    catch(err: any){
      console.log(err)
      if(err?.response?.status === 400){
        setErrMsg("Email already registered")
      }else{
        setErrMsg("Error, try again")
      }
    }
  }
  if(sessionStatus === 'loading'){
    return <>Loading...</>
  }

  return (
    sessionStatus !== "authenticated" && 
    (<div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <p className="text-red-600 text-[16px] mb-4">{errMsg && errMsg}</p>
        </form>
        <div className="text-center text-gray-500 mt-4">-OR-</div>
        <Link 
        className="block text-center text-blue-500 hover:undeline mt-2" 
        href={"/login"}>
          Login with existing account
        </Link>
      </div>
    </div>)
  );
};

export default Register;
