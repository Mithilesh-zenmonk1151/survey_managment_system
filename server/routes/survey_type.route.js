const router = require('express').Router();
const {survey_type_controller  } = require('../controller');

router.post("/",survey_type_controller.create_survey_type);
router.get("/",survey_type_controller.get_survey_type);

module.exports = router;