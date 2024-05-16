const router = require('express').Router();
const { question_type_controller  } = require('../controller');

router.post('/', question_type_controller.create_question_type);
router.get('/', question_type_controller.get_question_type);

module.exports = router;