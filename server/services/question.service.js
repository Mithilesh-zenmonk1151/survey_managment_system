const CustomError = require("../libs/error");
const { Op } = require("sequelize");
const {
  question,
  question_type,
  survey_question,
  survey,
} = require("../models");
exports.create_question = async (payload) => {
  try {
    const { question_type_id, description, abbr, active } = payload.body;
    if (!question_type_id || !description || !abbr) {
      throw new CustomError("All fields are required", 400);
    }
    const check_is_question_exists = await question.findOne({
      where: { description: description },
    });
    if (check_is_question_exists) {
      throw new CustomError("Question already exists", 409);
    }
    const quest = await question.create({
      question_type_id: question_type_id,
      abbr: abbr,
      description: description,
      active: active,
    });
    return quest;
  } catch (error) {
    throw error;
  }
};
exports.get_question = async (payload) => {
  try {
    // const page_number = payload.query.page_number || 1;
    console.log("");
    // const limit = payload.query.limit || 3;
    // console.log("PAGENUMER", page_number);
    // console.log("PAGENUMER", limit);
    // const search = payload.query.search || "";
    // console.log("LIMITsdjkghfegf==",limit)
    // const offset = (page_number - 1) * limit;
    // console.log("LIMIT&&&&OFerde",limit,offset);
    // console.log("PAYload.Query", payload.query.search);
    const surveyes = await question.findAndCountAll({
      include: [{ model: question_type, as: "question_type" }],
      // limit: limit,
      // offset: offset,
    });
    if (!surveyes) {
      throw new CustomError("Survey not found", 404);
    }
    // if (search) {
    //   queryOptions.where = {
    //     description: {
    //       [Op.like]: `%${search}%`,
    //     },
    //   };
    // }
    // const total_items = await question.count();
    const res = {
      data: surveyes,
      // total_items: total_items,
      // total_pages: Math.ceil(total_items / limit),
      // current_page: page_number,
    };
    return res;
  } catch (error) {
    throw error;
  }
};
exports.update_question = async (payload) => {
  try {
    const {id, description } = payload.body;
    const question_id=id;
    console.log("Quetioniiiiiiddddddddd======",question_id)
    console.log("PAYLOAD===========", payload.body);
    const servey_qu = await survey_question.findAll({
      where: { question_id: question_id },
    });
    const survey_ids = [...new Set(servey_qu.map((res) => res.survey_id))];
    const published = await survey.findAll({
      where: {
        id: survey_ids,
        is_published: true,
      },
    });
    if (published.length > 0) {
      throw new CustomError(
        "Survey is published in which this question is added",
        400
      );
    }
    const updated_qsts = await question.update(
      {
        description: description,
      },
      { where: { id: question_id } }
    );
    return updated_qsts;
  } catch (error) {
    throw error;
  }
};

exports.get_question_for_survey = async (payload) => {
  try {
    const { survey_id } = payload.body;
    const survey_data = await survey_question.findAll({
      where: { survey_id: survey_id },
    });

    const question_ids_in_table = await survey_data.map(
      (survey_question) => survey_question.question_id
    );
    const all_question_ids = await question.findAll({
      attributes: ["id"],
    });
    const all_question_id_list = all_question_ids.map((q) => q.id);
    const missingQuestionIds = all_question_id_list.filter(
      (question_id) => !question_ids_in_table.includes(question_id)
    );
    const missing_questions = await question.findAll({
      where: {
        id: missingQuestionIds,
      },
    });

    return missing_questions;
  } catch (error) {
    throw error;
  }
};
exports.delete_question = async (payload) => {
  try {
    const { question_id } = payload.body;
    if (!question_id) {
      throw new CustomError("Question id required", 400);
    }
    const delete_question = await question.destroy({
      where: { id: question_id },
    });
    return delete_question;
  } catch (error) {
    throw error;
  }
};

exports.get_question_thr_id = async (payload) => {
  try {
    const { question_id } = payload.body;
    console.log("Payload.body",payload.body);

    const surveyes = await question.findOne({
      where: { id: question_id },
      include: [{ model: question_type, as: "question_type" }],
    });
   if(is_published){
    
   }
    if (!surveyes) {
      throw new CustomError("Survey not found", 404);
    }

    const res = {
      data: surveyes,
    };

    return res;
  } catch (error) {
    throw error;
  }
};
