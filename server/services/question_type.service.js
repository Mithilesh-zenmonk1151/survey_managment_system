const CustomError = require("../libs/error");
const { question_type, question } = require("../models");
exports.create_question_type = async (payload) => {
  try {
    const { name, abbr } = payload.body;
    if (!name || !abbr) {
      throw new CustomError("All fields are Required", 400);
    }
    const is_exist_question_type = await question_type.findOne({
      where: { name: name, abbr: abbr },
    });
    if (is_exist_question_type) {
      throw new CustomError(
        "Question type  and abbriviation allready exist",
        409
      );
    }
    const question_tp = await question_type.create({
      name: name,
      abbr: abbr,
    });
    return question_tp;
  } catch (error) {
    throw error;
  }
};
exports.get_question_type = async (payload) => {
  try {
    console.log("GGETTT++++======");
    const quest_type = await question_type.findAll({
      include: [{ model: question, as: "questions" }],
    });
    console.log("Survey==========================");
    if (!quest_type) {
      throw new CustomError("Survey not found", 404);
    }
    return quest_type;
  } catch (error) {
    throw error;
  }
};
