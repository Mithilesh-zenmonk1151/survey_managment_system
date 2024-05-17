const { survey_question_service } = require("../services");
exports.create_survey_question = async (req, res) => {
  try {
    const response = await survey_question_service.create_survey_question(req);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({
      message: error.message,
      success: false,
    });
  }
};
exports.update_survey_question = async (req, res) => {
  try {
    const response = await survey_question_service.update_survey_question(req);
    res.status(200).json({ response });
  } catch (error) {
    res.status(200).json({ message: error.message, success: false });
  }
};

exports.delete_survey_question = async (req, res) => {
  try {
    const response = await survey_question_service.delete_survey_question(req);
    res.status(200).json({ response });
  } catch (error) {
    res.status(error.message).json({ message: error.message, success: false });
  }
};
