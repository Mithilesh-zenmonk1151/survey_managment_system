"use client"
import auth_slice from "@/slice/auth/auth_slice"
import question_slice from "@/slice/question/question_slice"
import question_type_slice from "@/slice/question_type/question_type_slice"
import survey_slice  from "@/slice/survey/survey_slice"
import survey_type_slice from "@/slice/survey_type/survey_type_slice"
// import questionSlice from "@/redux/question/questionSlice"
// import testSlice from "@/redux/test/testSlice"
import { combineReducers } from "@reduxjs/toolkit"



const root_reducer = combineReducers({
    auth:auth_slice,
    question_type:question_type_slice,
    questions:question_slice,
    survey_type: survey_type_slice,
    survey:survey_slice,
}
)
export default root_reducer

