const { survey_service } = require("../services");

exports.create_survey = async (req, res) => {
  try {
    const response = await survey_service.create_survey(req);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ message: error.message, success: false });
  }
};

exports.get_survey = async (req, res) => {
  try {
    const response = await survey_service.get_survey(req);
    res.status(200).json({ response });
  } catch (error) {
    // console.log(object)
    res.status(error.code).json({
      message: error.message,
      success: false,
    });
  }
};
exports.update_survey = async (req, res) => {
  try {
    const response = await survey_service.update_survey(req);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ message: error.message, success: false });
  }
};
exports.survey_update_at_publish = async (req, res) => {
  try {
    const response = await survey_service.update_survey(req);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ message: error.message, success: false });
  }
};
