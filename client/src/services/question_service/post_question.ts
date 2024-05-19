import axios from "axios";
import type {FieldValues} from "react-hook-form";
const post_question_service= async (inputs: FieldValues) => {
    const response = await axios.post("api/question/post_question", inputs)
    console.log(response)
    return response
}
export default post_question_service;