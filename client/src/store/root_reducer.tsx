"use client"
import auth_slice from "@/slice/auth/auth_slice"
// import questionSlice from "@/redux/question/questionSlice"
// import testSlice from "@/redux/test/testSlice"
import { combineReducers } from "@reduxjs/toolkit"



const root_reducer = combineReducers({
    auth:auth_slice,
    // test:testSlice,
    // question:questionSlice,
}
)
export default root_reducer

