const { question_service } = require("../services");
exports.create_question = async (req, res) => {
  try {
    const response = await question_service.create_question(req);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ message: error.message, success: false });
  }
};
exports.get_question = async (req, res) => {
    try {
        console.log("GGGEEETTTT")
      const response = await question_service.get_question(req);
      res.status(200).json({ response });
    } catch (error) {
      res.status(error.code).json({
        message: error.message,
        success: false,
      });
    }
  };
