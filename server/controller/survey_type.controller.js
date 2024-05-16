const { survey_type_service } = require("../services");
exports.create_survey_type = async (req, res) => {
  try {
    const response = await survey_type_service.create_survey_type(req);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({
      message: error.message,
      success: false,
    });
  }
};
exports.get_survey_type=async(req,res)=>{
    try{
        const response= await survey_type_service.get_survey_type(req);
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
