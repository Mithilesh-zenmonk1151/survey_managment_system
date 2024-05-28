import axios from "axios";
import type { FieldValues } from "react-hook-form";

const put_question_service = async (inputs: FieldValues) => {
   try{
    const response = await axios.put("api/question/put_question", inputs);
    console.log("sajdsfiPIUYT$%%$%$%$%%^%^^^65y&",response.data);
    return response.data;
   }
   catch(error:any){
    console.log("$$$$$$$$$$$$$45y56y5$",error);
    throw error;

   }
};

export default put_question_service;
