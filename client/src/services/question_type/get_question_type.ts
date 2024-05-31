import axios from "axios";
import type { FieldValues } from "react-hook-form";
const get_question_type_service = async () => {
    try {
        // console.log("IIINNNPPUUUTT", inputs);
        const response = await axios.get("api/question_type/get_question_type",);
        return response.data;
    } catch (error) {
        console.error("Error fetching tests:", error);
        return null;
    }
};
export default get_question_type_service;