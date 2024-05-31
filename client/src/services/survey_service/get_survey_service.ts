import axios from "axios";
import type { FieldValues } from "react-hook-form";
const get_survey_service = async () => {
    try {
        const response = await axios.get("api/survey/get_survey",);
        return response.data;
    } catch (error) {
        console.error("Error fetching tests:", error);
        return null;
    }
};
export default get_survey_service;