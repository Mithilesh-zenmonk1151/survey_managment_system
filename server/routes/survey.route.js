const router = require('express').Router();
const {survey_controller  } = require('../controller');

router.post('/', survey_controller.create_survey);
router.get('/', survey_controller.get_survey);
router.put('/',   survey_controller.update_survey);
router.put('/publish',   survey_controller.survey_update_at_publish);
router.delete('/:survey_id',   survey_controller.delete_survey);

module.exports = router;