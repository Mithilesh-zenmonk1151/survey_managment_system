import axios from "axios";
import type { FieldValues } from "react-hook-form";

const update_survey_service = async (inputs: FieldValues) => {
    const response = await axios.put("api/survey/put_survey_ori", inputs);
    console.log(response);
    return response;
};

export default update_survey_service;
