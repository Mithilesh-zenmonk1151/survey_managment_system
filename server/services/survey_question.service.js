const CustomError = require("../libs/error");
const {survey_question}= require("../models");
exports.create_survey_question=async(payload)=>{
    try{
        const {survey_id,question_id,order,question_description}=payload.body;
        console.log("PAYLLLOOOADDD.BBOd",payload.body);
        if(!survey_id || !question_id || !order || !question_description){
            throw new CustomError("All fields are required",400);
        }
        const check_order_duplicate= await survey_question.findOne({where:{order:order}});
        if(check_order_duplicate){
            throw new CustomError("order all ready exists",409)
        }
        const survey_qs= await survey_question.create({survey_id:survey_id,
            question_id:question_id,
            order:order,
            question_description,

        })
        return survey_qs

    }
    catch(error){
        throw error

    }
}