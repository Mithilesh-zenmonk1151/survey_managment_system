const router = require('express').Router();
const {question_controller  } = require('../controller');
router.post('/', question_controller.create_question);
router.get('/', question_controller.get_question);
router.get('/survey_question', question_controller.get_question_for_survey);
router.get('/question', question_controller.get_question_thr_id);
router.put('/', question_controller.update_question);
router.delete('/', question_controller.delete_question);
module.exports = router;