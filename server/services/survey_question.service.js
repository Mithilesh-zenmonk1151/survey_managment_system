const CustomError = require("../libs/error");
const { survey_question, question } = require("../models");
exports.create_survey_question = async (payload) => {
  try {
    const { survey_id, question_id, num } = payload.body.survey_question;
    console.log("PAYLOAD Body:", payload.body.survey_question);

    if (!survey_id) {
      throw new CustomError("survey_id is required", 400);
    }

    let question_ids = [];

    if (typeof question_id === "string") {
      question_ids = question_id
        .split(",")
        .map((id) => parseInt(id.trim(), 10));
    } else if (Array.isArray(question_id)) {
      question_ids = question_id.map((id) => parseInt(id, 10));
    } else {
      throw new CustomError("question_id should be a string or an array", 400);
    }

    const survey_questions = [];

    for (const question_id of question_ids) {
      const question_info = await question.findOne({
        where: { id: question_id },
      });

      if (!question_info) {
        throw new CustomError(`Question with ID ${question_id} not found`, 404);
      }

      const question_description = question_info.description;

      if (!question_description) {
        throw new CustomError(
          `Description for question with ID ${question_id} not found`,
          404
        );
      }
      const order = num;

      const check_order_duplicate = await survey_question.findOne({
        where: { order: order },
      });

      const survey_qs = await survey_question.create({
        survey_id: survey_id,
        question_id: question_id,
        order: order,
        question_description: question_description,
      });

      survey_questions.push(survey_qs);
    }

    return survey_questions;
  } catch (error) {
    throw error;
  }
};
exports.update_survey_question = async (payload) => {
  try {
    const { question_id,survey_id, question_description } = payload.body;
    console.log("PAyloadBoooodyyy$$$$$$$$$$$$$$$$$$$$$$",payload.body,question_id,survey_id)
    if (!question_id) {
      throw new CustomError("Survey question not found", 404);
    }

    const updated_survey_question = await survey_question.update(
      {
        question_description:question_description
      },
      { where: { question_id: question_id,survey_id:survey_id } },
      { new: true }
    );
    console.log("Updated@@@@@@@@@",updated_survey_question);
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
