const CustomError = require("../libs/error");
const {question,question_type,survey_question}= require("../models");
exports.create_question= async(payload)=>{
    try{
        const {question_type_id,description,abbr,active}=payload.body;
        if(!question_type_id || !description || !abbr ){
            throw new CustomError("All fields are required",400)
        }
        const check_is_question_exists= await question.findOne({where:{description:description}});
        if(check_is_question_exists){
            throw new CustomError("Question already exists",409)
        }
        const quest= await question.create({
            question_type_id:question_type_id,
            abbr:abbr,
            description:description,
            active:active


        })
        return quest;

    }
    catch(error){
       throw error
    }
}
exports.get_question = async (payload) => {
    try {
        const {question_id}=payload.body;
        const ServeyQu= await survey_question.findAll({where:{question_id:question_id}});
        console.log("SSEEERRRRRYJJK",ServeyQu);

        console.log("GGETTT++++======")
      const surveyes = await question.findAll({
        include: [{ model: question_type, as: "question_type" },],
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
exports.update_question=async(payload)=>{
    try{
        const {question_id}=payload.body;


    }
    catch(error){

    }


}