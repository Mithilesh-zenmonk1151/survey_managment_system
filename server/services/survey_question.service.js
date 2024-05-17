const CustomError = require("../libs/error");
const { survey_question, question } = require("../models");
// const question = require("../models/question");
exports.create_survey_question = async (payload) => {
  try {
    const { survey_id, question_id, order } = payload.body;
    const questiion_info = await question.findOne({
      where: { id: question_id },
    });
    const question_description = await questiion_info.description;
    console.log("PAYLLLOOOADDD.BBOd", payload.body);
    if (!survey_id || !question_id || !order || !question_description) {
      throw new CustomError("All fields are required", 400);
    }
    const check_order_duplicate = await survey_question.findOne({
      where: { order: order },
    });
    if (check_order_duplicate) {
      throw new CustomError("order all ready exists", 409);
    }
    const survey_qs = await survey_question.create({
      survey_id: survey_id,
      question_id: question_id,
      order: order,
      question_description,
    });
    return survey_qs;
  } catch (error) {
    throw error;
  }
};
exports.update_survey_question = async (payload) => {
  try {
    const { survey_question_id, description } = payload.body;
    if (!survey_question_id) {
      throw new CustomError("Survey question not found", 404);
    }
    const updated_survey_question = await survey_question.update(
      {
        description: description,
      },
      { where: { id: survey_question_id } },
      { new: true }
    );
    return updated_survey_question;
  } catch (error) {
    throw error;
  }
};
exports.delete_survey_question = async (payload) => {
  try {
    const { survey_question_id } = payload.body;
    const deleted_survey_question = await survey_question.destroy({
      where: { id: survey_question_id },
    });
    return deleted_survey_question;
  } catch (error) {
    throw error;
  }
};
