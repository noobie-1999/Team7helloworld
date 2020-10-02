// here posts of questions and test schemas will be handled
const Mongoose = require('mongoose');
const Test = require('../models/Test').Test
const Question = require('../models/Test').Question
const OrgTests = require('../models/Orgs').orgTests

function addTest(req, res, next) {
    // check if test name already exits

    var test = new Test({
        _id: new Mongoose.Types.ObjectId(),
        testName: req.body.testName,
        MaxMarks: req.body.maxMarks,
        perQuestionMarks: req.body.perQuestionMarks,
        negativeMarks: req.body.negativeMarks,
        questions: req.body.questions,

    })

    var OrgTest = new OrgTests({
        testId: test._id,
        teacherId: req.params.teacherId,
        start: false,
        userScores: []
    })

    Test.findOne({ testName: test.testName }, (err, result) => {
        if (err) next(err)
        else {
            if (!result) {

                Promise.all([OrgTest.save(), test.save()])
                    .then((result) => { res.send(test) })
                    .catch((err) => next(err))

            }
            else {
                res.status(409).json({
                    err: "test with given name already exists"
                })
            }
        }
    })



}

function addQuestion(req, res, next) {
    if (req.body.testId) {
        //check if test exists
        Test.findOne({ _id: req.body.testId }, (err, result) => {
            if (err) next(err)
            else {
                if (result == null) next("no such test id exists")
                else {

                    const value = { ...(req.body.question), _id: result.questions.length +1 }
                    result.questions.addToSet(new Question(value))
                    result.save((err, result) => {
                        if (err) next(err)
                        else res.send({ result })
                    })
                }
            }

        })

    }
}

function modifyQuestion(req, res, next) {
    if (!req.params.id) next("Question content can not be empty")
    if (!req.body.testId) next("Test id is req");
    Test.findOne({ _id: req.body.testId }, (err, result) => {
        if (err) next(err)
        else {
            if (result == null) next("no such test id exists")
            else {
                //    console.log(req.body.question)
                //    console.log(req.params.id)
                let ques = {};
                result.questions = result.questions.map((q, index) => {
                    //replace with new ques

                    if (q._id == req.params.id) {

                        var newQues = { ...req.body.question, _id: req.params.id };
                        ques = new Question(newQues)
                        return ques

                    }
                    else return q;

                })
                result.save((err, val) => {
                    if (err) next(err)
                    else { res.send(ques); }
                })
            }
        }
    })
}

function deleteQuestion(req, res, next) {
    if (!req.params.id) next("Question id cant be empty")
    else {
        Test.findOne({ _id: req.body.testId }, (err, result) => {
            if (err) next(err)
            else {
                if (!result) next("test with given testid is not found")
                else {
                    result.questions = result.questions.filter((q) => {
                        if (q._id == req.params.id) {
                            return false;
                        }
                        else return true;
                    })
                    result.save().then((result) => res.send(result)).catch((err) => res.send(err))

                }
            }
        })
    }
}
function viewQuestions(req, res, next) {

    Test.findOne({ _id: req.params._id }, (err, result) => {
        if (err) next(err)
        else {
            if (!result) next("no such test exists")
            else {
                res.send(result)
            }
        }
    })
}


function checkResult(req, res, next) {
    if (req.body.testId == null) next("test id is null")
    else {
        OrgTests.findOne({ testId: req.body.testId, teacherId: req.body.teacherId }, (err, result) => {
            if (err) next(err)
            else if (result == null) next("no such test exists")
            else {
                res.send(result.usersScores)
            }
        })
    }
}

module.exports = [
    addTest, addQuestion, checkResult, deleteQuestion, modifyQuestion, viewQuestions
]