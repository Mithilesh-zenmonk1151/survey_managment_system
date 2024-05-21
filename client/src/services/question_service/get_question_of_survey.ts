import axios from "axios";
import type { FieldValues } from "react-hook-form";

const get_question_of_survey_service = async (inputs: FieldValues) => {
  console.log("IIINNNNPPUUUTTTSTSTTSTST", inputs);

  const response = await axios.get("/api/question/get_question_of_survey", {
    params: inputs
  });
  console.log(response);
  return response;
};

export default get_question_of_survey_service;
