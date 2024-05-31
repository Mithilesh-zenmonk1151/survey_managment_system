import axios from "axios";
import type { FieldValues } from "react-hook-form";

const put_survey_service = async (inputs: FieldValues) => {
    const response = await axios.put("api/survey/put_survey", inputs);
    return response;
};

export default put_survey_service;
