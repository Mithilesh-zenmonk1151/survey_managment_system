
import axios from "axios";
import type {FieldValues} from "react-hook-form";

const post_question_type_service= async (inputs: FieldValues) => {
    const response = await axios.post("api/question_type/post_question_type", inputs)
    return response
}
export default post_question_type_service;