import axios from "axios";
import type { FieldValues } from "react-hook-form";

const put_question_service = async (inputs: FieldValues) => {
   try{
    const response = await axios.put("api/question/put_question", inputs);
    return response.data;
   }
   catch(error:any){
    throw error;

   }
};

export default put_question_service;
