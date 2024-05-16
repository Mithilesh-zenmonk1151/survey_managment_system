import axios from "axios";
import type {FieldValues} from "react-hook-form";
const login_service = async (inputs: FieldValues) => {
    console.log("SEERvice=====================",inputs);
    const response = await axios.post("api/auth/login", inputs)
    console.log("yah service wala response haui",response)
    return response
}
export default login_service;