const expresss = require('express');
const router = expresss.Router();

const [userVerify] = require('../middleware/userVer');

const orgVerify = require('../middleware/orgVer').verify

const [addTest, addQuestion, checkResult,deleteQuestion, modifyQuestion,viewQuestions, viewStudentResult] = require('../handlers/orgTest');

const [takeTest, submitTest , viewResult] = require('../handlers/userPost');

router.route('/users/takeTest').post(userVerify,  takeTest);
router.route("/users/submitTest").post(userVerify, submitTest)
router.route('/users/viewResult').post(userVerify,  viewResult);


router.route("/orgs/addTest").post(orgVerify,addTest)
router.route("/orgs/checkResult").post(orgVerify,checkResult)
router.route("/orgs/questions/:_id").post(orgVerify,viewQuestions)
router.route("/orgs/addQuestions").post(orgVerify,addQuestion)
router.route("/orgs/questions/:id").put(orgVerify, modifyQuestion)
router.route("/orgs/questions/:id").delete(orgVerify, deleteQuestion)
router.route('/orgs/viewStudentResult').post(orgVerify, viewStudentResult);

router.route("*").all((req, res, next) => res.send("route not found"));


module.exports = router;