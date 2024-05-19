const CustomError = require("../libs/error");
const { survey_type,survey } = require("../models");
exports.create_survey_type = async (payload) => {
  try {
    const { name, abbr } = payload.body;
    if (!name || !abbr) {
      throw new CustomError("All fields are required",404);
    }
    const check_survey_type= await survey_type.findOne({where:{name:name}});
    if(check_survey_type){
        throw new CustomError("This type of survey is already exists",409)
    }
    const survey_tp = await survey_type.create({ name: name, abbr: abbr });
    return survey_tp
  } catch (error) {
    throw error;
  }
};
exports.get_survey_type = async (payload) => {
    try {
        console.log("GGETTT++++======")
      const sry_type= await survey_type.findAll({
        include: [{ model: survey, as: "surveys" }],
      });
  
      console.log("Survey==========================");
  
      if (!sry_type) {
        throw new CustomError("Survey not found", 404);
      }
      return sry_type;
    } catch (error) {
      throw error;
    }
  };

  exports.update_survey_type = async (payload) => {
    try {
      // const { survey_id_type } = payload.params;
      const {survey_type_id,name,abbr}= payload.body;

      const updated_survey_type = await survey.update(
        { name: name, abbr:abbr },
        { where: {id:survey_type_id } },      { new: true },
  
      );
      return updated_survey_type;
    } catch (error) {
      throw error;
    }
  };
  

