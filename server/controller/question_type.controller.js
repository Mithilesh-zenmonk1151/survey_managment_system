const { question_type_service } = require("../services");
exports.create_question_type = async (req, res) => {
  try {
    const response = await question_type_service.create_question_type(req);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ message: error.message, success: false });
  }
};
exports.get_question_type=async(req,res)=>{
    try{
        const response= await question_type_service.get_question_type(req);
        res.status(200).json({response});
    }
    catch(error){
        console.log(error);
        res.status(error.code).json({
            message:error.message,
            success:false
        })

    }
}
