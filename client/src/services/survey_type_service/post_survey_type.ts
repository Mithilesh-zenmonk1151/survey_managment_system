
import axios from "axios";
import type {FieldValues} from "react-hook-form";

const post_survey_type_service= async (inputs: FieldValues) => {
    const response = await axios.post("api/survey_type/post_survey_type", inputs)
    return response
}
export default post_survey_type_service;