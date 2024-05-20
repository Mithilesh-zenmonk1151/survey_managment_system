import axios from "axios";
import type { FieldValues } from "react-hook-form";

const put_question_service = async (inputs: FieldValues) => {
    const response = await axios.put("api/question/put_question", inputs);
    console.log(response);
    return response;
};

export default put_question_service;
