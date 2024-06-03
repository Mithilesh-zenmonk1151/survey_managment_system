import axios from "axios";

const get_question_service = async () => {
  try {
    const response = await axios.get(`/api/question/get_question`, {
      // params: {
      //   pageLimit,
      //   pageNumber,
      // },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return null;
  }
};

export default get_question_service;
