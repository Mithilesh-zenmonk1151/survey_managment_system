const {survey_question_service}= require("../services");
exports.create_survey_question=async(req,res)=>{
    try{
        const response= await survey_question_service.create_survey_question(req);
        res.status(201).json({response})

    }
    catch(error){
        console.log(error);
        res.status(error.code).json({
            message:error.message,
            success:false
        })

    }
}