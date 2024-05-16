const CustomError = require("../libs/error");
const { survey, survey_type } = require("../models");
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
    const surveyes = await survey.findAll({
      include: [{ model: survey_type, as: "survey_type" }],
    });

    console.log("Survey==========================");

    if (!surveyes) {
      throw new CustomError("Survey not found", 404);
    }
    return surveyes;
  } catch (error) {
    throw error;
  }
};
exports.update_survey = async (payload) => {
  try {
    // const { survey_id } = payload.params;
    const { name, survey_type_id, options, survey_id  } = payload.body;
    
    const check_is_survey_exists = await survey.findOne({
      where: { id: survey_id },
    });
    if (!check_is_survey_exists) {
      throw new CustomError("Survey is not exists", 404);
    }
    const updated_survey = await survey.update(
      { name: name, survey_type_id, options },
      { where: {id:survey_id } },      { new: true },

    );
    return updated_survey;
  } catch (error) {
    throw error;
  }
};

exports.survey_update_at_publish=async(payload)=>{
    try{
    const { is_published,survey_id,publication_status_changed_at} = payload.body;
    
    const check_is_survey_exists = await survey.findOne({
      where: { id: survey_id },
    });
    if (!check_is_survey_exists) {
      throw new CustomError("Survey is not exists", 404);
    }
    const updated_survey = await survey.update(
      {is_published:is_published,publication_status_changed_at },
      { where: {id:survey_id } },      { new: true },

    );
    return updated_survey;
  } catch (error) {
    throw error;
  }
};