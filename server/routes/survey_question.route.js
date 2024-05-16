const router = require('express').Router();
const { survey_question_controller  } = require('../controller');

router.post("/",survey_question_controller.create_survey_question);

module.exports = router;