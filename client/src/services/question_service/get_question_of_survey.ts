import axios from 'axios';

const get_question_of_survey_service = async (survey_id: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/question/question_of_survey/${survey_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    throw error;
  }
};

export default get_question_of_survey_service;
