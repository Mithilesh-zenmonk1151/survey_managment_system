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
    // const page_number = payload.query.page_number || 1;
    console.log("");
    // const limit = payload.query.limit || 3;
    // console.log("PAGENUMER", page_number);
    // console.log("PAGENUMER", limit);
    // const offset = (page_number - 1) * limit;
    console.log("PAYload.Query", payload.query);
    const get_srv = await survey.findAndCountAll({
      include: [{ model: survey_type, as: "survey_type" }],
      // limit: limit,
      // offset: offset,
    });
    console.log("GGetttetdfj", get_srv);
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
exports.update_survey = async (payload) => {
  try {
    const { name, survey_type_id, options, survey_id } = payload.body;
    const check_is_survey_exists = await survey.findOne({
      where: { id: survey_id },
    });
    if (!check_is_survey_exists) {
      throw new CustomError("Survey is not exists", 404);
    }
    const updated_survey = await survey.update(
      { name: name, survey_type_id:survey_type_id, options:options },
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
    console.log("PAYy", payload.body);
    const survey_id = payload.body.id;
    console.log("SurveyID", survey_id);

    const check_is_survey_exists = await survey.findOne({
      where: { id: survey_id },
    });
    if (!check_is_survey_exists) {
      throw new CustomError("Survey is not exists", 404);
    }
    const published_at = new Date();
    console.log("PUBLISHEd at", published_at);
    const publication_status_changed_at = new Date();
    console.log("PUBLISHEd at", publication_status_changed_at);

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
    console.log("updated_survey ===========", updated_survey);
    return updated_survey;
  } catch (error) {
    throw error;
  }
};
