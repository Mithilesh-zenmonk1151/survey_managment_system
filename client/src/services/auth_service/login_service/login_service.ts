import axios from "axios";
import type {FieldValues} from "react-hook-form";
const login_service = async (inputs: FieldValues) => {
    const response = await axios.post("api/auth/login", inputs)
    return response
}
export default login_service;