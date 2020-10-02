// here posts of questions and test schemas will be handled
const Mongoose = require('mongoose');
const Test = require('../models/Test').Test
const Question = require('../models/Test').Question
const OrgTests = require('../models/Orgs').orgTests
const formidable = require('formidable');
const fs = require('fs')
const axios = require('axios');

function addTest(req, res, next) {
    // check if test name already exits

    // const form = formidable({ multiples: true });

    // form.parse(req, (err, fields, files) => {
  
    //     fileTxt = fs.readFileSync(files.multipleFiles.path).toString()

    //     axios.post('/ujjwal bhaiya ka route', {
    //         fileTxt: fileTxt
    //       })
    //       .then(function (response) {
    //         console.log(response);

    //         // i have to replace this req.body with response

    //         var test = new Test({
    //             _id: new Mongoose.Types.ObjectId(),
    //             testName: req.body.testName,
    //             maxMarks: req.body.maxMarks,
    //             perQuestionMarks: req.body.perQuestionMarks,
    //             negativeMarks: req.body.negativeMarks,
    //             questions: req.body.questions,
        
    //         })
        
    //         var OrgTest = new OrgTests({
    //             testId: test._id,
    //             teacherId: req.params.teacherId,
    //             userScores: []
    //         })
        
    //         Test.findOne({ testName: test.testName }, (err, result) => {
    //             if (err) next(err)
    //             else {
    //                 if (!result) {
        
    //                     Promise.all([OrgTest.save(), test.save()])
    //                         .then((result) => { res.send(test) })
    //                         .catch((err) => next(err))
        
    //                 }
    //                 else {
    //                     res.status(409).json({
    //                         err: "test with given name already exists"
    //                     })
    //                 }
    //             }
    //         })
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    // });

    var test = new Test({
        _id: new Mongoose.Types.ObjectId(),
        testName: req.body.testName,
        maxMarks: req.body.maxMarks,
        perQuestionMarks: req.body.perQuestionMarks,
        negativeMarks: req.body.negativeMarks,
        questions: req.body.questions,

    })

    var OrgTest = new OrgTests({
        testId: test._id,
        teacherId: req.params.teacherId,
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

function viewStudentResult(req, res, next) {
    if (req.body.testId && req.body.studentEmail) {

        orgTests.findOne({ testId: req.body.testId}, (err, result) => {
            if (err) next(err)
            else if (result == null) {
                next("No such test exists (source: Org)")
            }
            else{

                f=0

                for (let i = 0; i < result.usersScores.length; i++) {
                    
                    if(result.usersScores[i].email== req.body.studentEmail){

                        res.send(result.usersScores[i])
                        f=1
                        break
                    }
                }

                if(!f){
                    next('No such user exists')
                }

            }
        })
    }
    else next("Test id or student id is not present")
}

module.exports = [
    addTest, addQuestion, checkResult, deleteQuestion, modifyQuestion, viewQuestions,viewStudentResult
]