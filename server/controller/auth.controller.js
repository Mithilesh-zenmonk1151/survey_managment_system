const {auth_service} = require("../services");
exports.signup = async (req, res) => {
  try {
    const response = await auth_service.signup(req);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ message: error.message, success: false });
  }
};
