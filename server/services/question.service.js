const CustomError = require("../libs/error");
const { Op, where } = require("sequelize");
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
      where: { description: description, abbr: abbr },
    });
    if (check_is_question_exists) {
      throw new CustomError(
        "This name or abbriviation of question already exists",
        409
      );
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
    console.log("QUERY@@@@@***************", payload.query);
    const page_number = payload.query.page || 1;
    const limit = payload.query.limit || 5;
    const search = payload.query.search || "";
    const offset = (page_number - 1) * limit;
    console.log("PAGENUMBER", page_number);
    console.log("PAGENUMBERLimit", limit);
    console.log("LIMITsdjkghfegf==", limit);
    console.log("LIMIT&&&&OFerde", limit, offset);
    console.log("PAYload.Query", payload.query.search);
    let query_options = {
      where: {
        active: true,
      },
      include: [{ model: question_type, as: "question_type" }],
      order: [["createdAt", "ASC"]],
      limit: limit,
      offset: offset,
    };

    if (search) {
      query_options.where = {
        ...query_options.where,
        description: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    const surveyes = await question.findAndCountAll(query_options);

    if (!surveyes) {
      throw new CustomError("Survey not found", 404);
    }
    console.log("SSSSSSSSU#$#$$$$$",surveyes);

    const total_items = surveyes.count;
    const total_pages = Math.ceil(total_items / limit);
    const res = {
      data: surveyes.rows,
      total_items: total_items,
      total_pages: total_pages,
      current_page: page_number,
    };
    console.log("sSer???????????????",res);

    return res;
  } catch (error) {
    throw error;
  }
};
exports.partialy_delete = async (payload) => {
  try {
    const { question_id } = payload.params;
    console.log("$%%$%%^^", question_id);
    if (!question_id) {
      throw new CustomError("Question id required", 400);
    }
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
        "The question cannot be deleted because it is in one or more published surveys",
        400
      );
    }
    const deleted_at = new Date();
    const delete_question = await question.update(
      { active: false, deleted_at: deleted_at },
      {
        where: { id: question_id },
      }
    );
    return delete_question;
  } catch (error) {
    throw error;
  }
};
exports.update_question = async (payload) => {
  try {
    const { id, description } = payload.body;
    const question_id = id;
    console.log("PAAAYYAAAAAAAAAAAALOADDDDDDD", payload.body);
    console.log("PAPPAAYYAAAAAAAAAAAA", description);
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
        "The question cannot be edited because it is in one or more published surveys",
        400
      );
    }
    const updated_qsts = await question.update(
      {
        description: description,
      },
      { where: { id: question_id } }
    );
    console.log("sdsadasdasd", updated_qsts);
    return updated_qsts;
  } catch (error) {
    throw error;
  }
};
exports.get_question_for_survey = async (payload) => {
  try {
    const { survey_id } = payload.params;
    console.log("PPPAYYloa@######", payload.params);
    if (!survey_id) {
      throw new CustomError("survey id is required", 400);
    }
    const survey_data = await survey_question.findAll({
      where: { survey_id: survey_id },
    });
    const question_ids_in_table = await survey_data.map(
      (survey_question) => survey_question.question_id
    );
    const all_question_ids = await question.findAll(
      { where: { active: true, deleted_at: null } },
      {
        attributes: ["id"],
      }
    );
    const all_question_id_list = all_question_ids.map((q) => q.id);
    const missing_question_ids = all_question_id_list.filter(
      (question_id) => !question_ids_in_table.includes(question_id)
    );
    const missing_questions = await question.findAll({
      where: {
        id: missing_question_ids,
      },
      limit: limit,
      offset: offset,
    });
    return missing_questions;
  } catch (error) {
    throw error;
  }
};
exports.delete_question = async (payload) => {
  try {
    const { question_id } = payload.params;
    console.log("$%%$%%^^", question_id);
    if (!question_id) {
      throw new CustomError("Question id required", 400);
    }
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
    const surveyes = await question.findOne({
      where: { id: question_id },
      include: [{ model: question_type, as: "question_type" }],
    });
    if (is_published) {
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
exports.get_question_of_survey = async (payload) => {
  try {
    console.log("QUERY@@@@@***************", payload.query);
    const page_number = payload.query.page || 1;
    const limit = payload.query.limit || 5;
    const search = payload.query.search || "";
    const offset = (page_number - 1) * limit;
    const { survey_id } = payload.params;
    if (!survey_id) {
      throw new CustomError("Survey Id Not found", 400);
    }
    const survey_data = await survey_question.findAll({
      where: { survey_id: survey_id },
    });
    const question_ids_in_table = survey_data.map(
      (survey_question) => survey_question.question_id
    );
    const unique_question_ids_in_table = [...new Set(question_ids_in_table)];
    console.log("PKANbxscksxj===========", unique_question_ids_in_table);
    const questions = await question.findAll({
      where: {
        id: unique_question_ids_in_table,
        deleted_at: null,
      },
      include: [
        {
          model: question_type,
          as: "question_type",
        },
      ],
      limit: limit,
      offset: offset,
    });
    console.log("data lrthrthrthrt", questions.length);
    return questions;
  } catch (error) {
    throw error;
  }
};
exports.create_question_survey_inside_survey = async (payload) => {
  try {
    const { question_type_id, description, abbr, active, survey_id } =
      payload.body;
  } catch (error) {}
};
exports.get_deleted_questions = async (payload) => {
  try {
    console.log("QUERY@@@@@***************", payload.query);
    const page_number = payload.query.page_number || 1;
    const limit = payload.query.limit || 50;
    const search = payload.query.search || "";
    const offset = (page_number - 1) * limit;
    console.log("PAGENUMBER", page_number);
    console.log("PAGENUMBERLimit", limit);
    console.log("LIMITsdjkghfegf==", limit);
    console.log("LIMIT&&&&OFerde", limit, offset);
    console.log("PAYload.Query", payload.query.search);
    let query_options = {
      where: {
        active: false,
      },
      include: [{ model: question_type, as: "question_type" }],
      order: [["createdAt", "ASC"]],
      limit: limit,
      offset: offset,
    };
    if (search) {
      query_options.where = {
        ...query_options.where,
        description: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    const surveyes = await question.findAndCountAll(query_options);
    if (!surveyes) {
      throw new CustomError("Survey not found", 404);
    }
    const total_items = surveyes.count;
    const total_pages = Math.ceil(total_items / limit);
    const res = {
      data: surveyes.rows,
      total_items: total_items,
      total_pages: total_pages,
      current_page: page_number,
    };
    return res;
  } catch (error) {
    throw error;
  }
};
// exports.get_question_of_survey = async (payload) => {
//   try {
//     const { survey_id } = payload.params;
//     console.log("PAYLOAD", payload.body);

//     if (!survey_id) {
//       throw new CustomError("Survey Id Not found", 400);
//     }

//     const survey_data = await survey_question.findAll({
//       where: { survey_id },
//     });
//     console.log("surveyData", survey_data);

//     const question_ids_in_table = survey_data.map(
//       (survey_question) => survey_question.question_id
//     );
//     console.log("Questsasdajd", question_ids_in_table);

//     const questions = await question.findAll({
//       where: {
//         id: question_ids_in_table,
//       },
//       include: [
//         {
//           model: survey_question,
//           as: "survey_question",
//         },
//       ],
//     });

//     return questions;
//   } catch (error) {
//     throw error;
//   }
// };
