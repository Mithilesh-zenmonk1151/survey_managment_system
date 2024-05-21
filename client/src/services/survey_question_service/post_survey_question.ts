import axios from "axios";
import type {FieldValues} from "react-hook-form";
const post_survey_question_service= async (inputs: FieldValues) => {
    const response = await axios.post("api/survey_question/post_survey_question", inputs)
    console.log(response)
    return response
}
export default post_survey_question_service;