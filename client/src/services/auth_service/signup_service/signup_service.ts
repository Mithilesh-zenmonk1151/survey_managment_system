
import axios from "axios";
import type {FieldValues} from "react-hook-form";

const register_service = async (inputs: FieldValues) => {
    const response = await axios.post("api/auth/signup", inputs)
    return response
}
export default register_service