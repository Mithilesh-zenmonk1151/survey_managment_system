const router = require("express").Router();
router.use("/question_type",require("./question_type.route"));
router.use("/question",require("./question.route"));
router.use("/survey_question",require("./survey_question.route"));
router.use("/survey_type",require("./survey_type.route"));
router.use("/survey",require("./survey.route"))
module.exports = router;
