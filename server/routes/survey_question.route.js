const router = require('express').Router();
const { survey_question_controller  } = require('../controller');

router.post("/",survey_question_controller.create_survey_question);
router.put("/",survey_question_controller.update_survey_question);
router.delete("/:survey_id/:question_id",survey_question_controller.delete_survey_question);


module.exports = router;