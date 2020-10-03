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

    // axios.post('http://6856ac2aade6.ngrok.io/', {
    //         "text": "George Walker Bush (born July 6, 1946) is an American politician and businessman who served as the 43rd president of the United States from 2001 to 2009. A member of the Republican Party, he had previously served as the 46th governor of Texas from 1995 to 2000. Born into the Bush family, his father, George H. W. Bush, served as the 41st president of the United States from 1989 to 1993. Bush is the eldest son of Barbara and George H. W. Bush. As such he is the second son of a former United States President to himself become the American president, with the first being John Quincy Adams. He flew warplanes in the Texas and Alabama Air National Guard. After graduating from Yale College in 1968 and Harvard Business School in 1975, he worked in the oil industry. Bush married Laura Welch in 1977 and unsuccessfully ran for the U.S. House of Representatives shortly thereafter. He later co-owned the Texas Rangers baseball team before defeating Ann Richards in the 1994 Texas gubernatorial election. As governor, Bush successfully sponsored legislation for tort reform, increased education funding, set higher standards for schools, and reformed the criminal justice system. Bush also helped make Texas the leading producer of wind powered electricity in the United States. Bush was elected president of the United States in 2000 when he defeated Democratic incumbent Vice President Al Gore after a narrow and contested win that involved a Supreme Court decision to stop a recount in Florida. He became the fourth person to be elected president without a popular vote victory. Upon taking office, Bush pushed through a $1.3 trillion tax cut program and the No Child Left Behind Act, a major education bill. He also pushed for socially conservative efforts, such as the Partial-Birth Abortion Ban Act and faith-based welfare initiatives. In response to the September 11 terrorist attacks, Bush created the United States Department of Homeland Security and launched a 'War on Terror' that began with the war in Afghanistan in 2001. He also signed into law the controversial Patriot Act in order to authorize surveillance of suspected terrorists. In 2003, Bush ordered an invasion of Iraq, with the administration arguing that the Saddam Hussein regime possessed an active weapons of mass destruction (WMD) program, and that the Iraqi government posed a threat to the United States. Some administration officials falsely claimed that Hussein had an operational relationship with Al-Qaeda, the perpetrators of the 9/11 attack. No stockpiles of WMDs or an active WMD program were ever found in Iraq. Bush also passed the Medicare Modernization Act, which created Medicare Part D, and funding for the AIDS relief program known as PEPFAR."
    //     })
    //         .then(function (response) {
    //             // console.log(response)
    //             questions = (response.data.questions)

    //             console.log(response.data)

    //             var test = new Test({
    //                 _id: new Mongoose.Types.ObjectId(),
    //                 testName: req.body.testName,
    //                 maxMarks: req.body.maxMarks,
    //                 perQuestionMarks: req.body.perQuestionMarks,
    //                 negativeMarks: req.body.negativeMarks,
    //                 questions: questions,

    //             })

    //             var OrgTest = new OrgTests({
    //                 testId: test._id,
    //                 teacherId: req.params.teacherId,
    //                 userScores: []
    //             })

    //             Test.findOne({ testName: test.testName }, (err, result) => {
    //                 if (err) next(err)
    //                 else {
    //                     if (!result) {

    //                         Promise.all([OrgTest.save(), test.save()])
    //                             .then((result) => { res.send(test) })
    //                             .catch((err) => next(err))

    //                     }
    //                     else {
    //                         res.status(409).json({
    //                             err: "test with given name already exists"
    //                         })
    //                     }
    //                 }
    //             })
    //         })
    //         .catch(function (error) {
    //             res.send(error);
    //         });

    form.parse(req, (err, fields, files) => {

        fileTxt = fs.readFileSync(files.multipleFiles.path).toString()

        axios.post('http://6856ac2aade6.ngrok.io/', {
            "text": fileTxt
        })
            .then(function (response) {
                // console.log(response)
                questions = (response.data)

                var test = new Test({
                    _id: new Mongoose.Types.ObjectId(),
                    testName: req.body.testName,
                    maxMarks: req.body.maxMarks,
                    perQuestionMarks: req.body.perQuestionMarks,
                    negativeMarks: req.body.negativeMarks,
                    questions: questions,

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
            })
            .catch(function (error) {
                res.send(error);
            });
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

                    const value = { ...(req.body.question), _id: result.questions.length + 1 }
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

        orgTests.findOne({ testId: req.body.testId }, (err, result) => {
            if (err) next(err)
            else if (result == null) {
                next("No such test exists (source: Org)")
            }
            else {

                f = 0

                for (let i = 0; i < result.usersScores.length; i++) {

                    if (result.usersScores[i].email == req.body.studentEmail) {

                        res.send(result.usersScores[i])
                        f = 1
                        break
                    }
                }

                if (!f) {
                    next('No such user exists')
                }

            }
        })
    }
    else next("Test id or student id is not present")
}

module.exports = [
    addTest, addQuestion, checkResult, deleteQuestion, modifyQuestion, viewQuestions, viewStudentResult
]