const router = require('express').Router();
const {question_controller  } = require('../controller');

router.post('/', question_controller.create_question);
router.get('/', question_controller.get_question);

module.exports = router;