import axios from "axios";
import type { FieldValues } from "react-hook-form";
const get_survey_service = async () => {
    try {
        console.log("Getquestion Service")
        // console.log("IIINNNPPUUUTT", inputs);
        const response = await axios.get("api/survey/get_survey",);
        console.log("conslole for getting post_question",response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching tests:", error);
        return null;
    }
};
export default get_survey_service;