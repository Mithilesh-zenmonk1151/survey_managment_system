const CustomError = require("../libs/error");
const { Op, where } = require("sequelize");

const { survey, survey_type ,question} = require("../models");
exports.create_survey = async (payload) => {
  try {
    const { survey_type_id, name, abbr, options } = payload.body;
    console.log("PAYLOAD.BOODDYY==========", payload.body);
    if (!survey_type_id || !name || !abbr || !options) {
      throw new CustomError("All Fields are required", 400);
    }
    const check_survey_exists = await survey.findOne({ where: { name: name } });
    if (check_survey_exists) {
      throw new CustomError("Same name of survey allready exists", 409);
    }
    const crt_survey = await survey.create({
      survey_type_id: survey_type_id,
      name: name,
      abbr: abbr,
      options: options,
    });

    return crt_survey;
  } catch (error) {
    throw error;
  }
};
exports.get_survey = async (payload) => {
  try {
    // const page_number = payload.query.page_number || 1;
    // const limit = payload.query.limit || 3;
    // console.log("PAGENUMER", page_number);
    // console.log("PAGENUMER", limit);
    // const offset = (page_number - 1) * limit;
    const get_srv = await survey.findAndCountAll({
      include: [
        { model: survey_type, as: "survey_type" },
        {
          model: question,
          as: "questions",
         
         
        }
      ],
      order: [['createdAt', 'ASC']],
      where: { deleted_at: null }
      // limit: limit,
      // offset: offset,
    });
    if (!get_srv) {
      throw new CustomError("Survey not found", 404);
    }
    // const total_items = await question.count();
    const res = {
      data: get_srv,
      // total_items: total_items,
      // total_pages: Math.ceil(total_items / limit),
      // current_page: page_number,
    };
    console.log("RES",res)
    return res;
  } catch (error) {
    throw error;
  }
};
exports.update_survey = async (payload) => {
  try {
    const { name, survey_type_id, options ,id} = payload.body;
    console.log("Surve^%%^&&yiiiddd",payload.body)
    const survey_id = id;
    console.log("survey_IIIIIIIIIIIII",survey_id)
    if(!survey_type_id ){
      throw new CustomError("Survey type Id not found",400);
    }
    if(!survey_id ){
      throw new CustomError("Survey Id not found",400);
    }
    const check_is_survey_exists = await survey.findOne({
      where: { id: survey_id },
    });
    console.log("NNAAMMAM",name);

    if (!check_is_survey_exists) {
      throw new CustomError("Survey is not exists", 404);
    }
    const updated_survey = await survey.update(
      { name: name, survey_type_id: survey_type_id, options: options },
      { where: { id: survey_id } },
      { new: true }
    );
    return updated_survey;
  } catch (error) {
    throw error;
  }
};

exports.survey_update_at_publish = async (payload) => {
  try {
    const { is_published } = payload.body;
    const survey_id = payload.body.id;
    if(!survey_id){
      throw new CustomError("Survey id required",499)
    }

    const check_is_survey_exists = await survey.findOne({
      where: { id: survey_id },
    });
    if (!check_is_survey_exists) {
      throw new CustomError("Survey is not exists", 404);
    }
    const published_at = new Date();
    const publication_status_changed_at = new Date();

    let updated_survey;
    if (is_published) {
      updated_survey = await survey.update(
        {
          is_published: is_published,
          published_at: published_at,
          publication_status_changed_at: publication_status_changed_at,
        },
        { where: { id: survey_id } }
      );
    }
    updated_survey = await survey.update(
      {
        is_published: is_published,
        publication_status_changed_at: publication_status_changed_at,
      },
      { where: { id: survey_id } }
    );
    return updated_survey;
  } catch (error) {
    throw error;
  }
};
exports.partial_delete_survey=async(payload)=>{
  try{
    const { survey_id } = payload.params;
    console.log("$%%$%fgdfggfgfh%^^",payload.params);
    if (!survey_id) {
      throw new CustomError("Survey id required", 400);
    }
    const deleted_at=new Date();
    const partial_delete_surve = await survey.update( {
      deleted_at:deleted_at
    },{
      where: { id: survey_id },
    });
    console.log("PARTIIAAAAAALDELETE",partial_delete_surve)
    return partial_delete_surve;

  }
  catch(error){

  }
}
exports.delete_survey = async (payload) => {
  try {
    const { survey_id } = payload.params;
    console.log("$%%$%fgdfggfgfh%^^",payload.params);
    if (!survey_id) {
      throw new CustomError("Survey id required", 400);
    }
    // const servey_qu = await survey_question.findAll({
    //   where: { question_id: question_id },
    // });
    // const survey_ids = [...new Set(servey_qu.map((res) => res.survey_id))];
    // const published = await survey.findAll({
    //   where: {
    //     id: survey_ids,
    //     is_published: true,
    //   },
    // });
    // if (published.length > 0) {
    //   throw new CustomError(
    //     "Survey is published in which this question is added",
    //     400
    //   );
    // }
    const delete_surve = await survey.destroy({
      where: { id: survey_id },
    });
    return delete_surve;
  } catch (error) {
    throw error;
  }
};
exports.get_deleted_survey = async (payload) => {
  try {
   
    const get_srv = await survey.findAndCountAll({
      include: [
        { model: survey_type, as: "survey_type" },
        { model: question, as: "questions" }, // Include the 'question' model
      ],order: [['createdAt', 'ASC']],
      where: { deleted_at: { [Op.not]: null } }       // limit: limit,
      // offset: offset,
    });
    if (!get_srv) {
      throw new CustomError("Survey not found", 404);
    }
    // const total_items = await question.count();
    const res = {
      data: get_srv,
      // total_items: total_items,
      // total_pages: Math.ceil(total_items / limit),
      // current_page: page_number,
      
    };
    return res;
  } catch (error) {
    throw error;
  }
};