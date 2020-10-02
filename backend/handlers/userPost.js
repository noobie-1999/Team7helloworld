const Test = require('../models/Test').Test
const orgTests = require('../models/Orgs').orgTests
const userScore = require('../models/Orgs').userScore

function takeTest(req, res, next) {
    if (req.body.testId) {
        Test.findOne({ _id: req.body.testId}, (err, result) => {
            if (err) next(err)
            else {
                if (result == null) next("No such test is present")
                else {
                    //send the user question and options
                    var questionSet = [];
                    result.questions.forEach((question) => {
                        var q = {
                            quid: question._id,
                            ques: question.question,
                            options: question.options
                        }
                        questionSet.push(q)
                    })
                    var data = { questionSet, testId: result._id}
                    res.send(data)
                }
            }
        })
    }
    else next("Test id is not present")
}

function submitTest(req, res, next) {
    // passing all the validation

    if (req.body.testId == null) next("testId not given")
    Test.findOne({ _id: req.body.testId }, (err, result) => {
        if (err) next(err)
        else if (result == null) next("no such test exists (source Test)")
        else {
            // iterate through answer array
            // and find answer values 
            let totalMarks = 0;
            let match = new Map()
            result.questions.forEach((value) => {
                match.set(value._id, value.correct)
            })

            // itertate through object array and 
            //get the current score
            req.body.ans.forEach((value) => {
                // check if key is there
                let correctAns = match.get(parseInt(value._id))
                console.log(value)
                console.log(value._id)
                console.log(value.ans)
                console.log(correctAns)
                // add marks if correct 
                if (correctAns != null && correctAns == value.ans) {
                    totalMarks++
                }
            })
            // push the result to user

            orgTests.findOne({ testId: req.body.testId }, (err, result1) => {
                if (err) next(err)
                else if (result1 == null) {
                    next("No such test exists (source: Org)")

                }
                else {
                    // add user 
                    let newUser = userScore({name: req.body.name,email:req.body.email,marks:totalMarks,maxMarks: result.maxMarks })
                    // for first entry

                    if (result1.usersScores.length == 0) {

                        result1.usersScores = [newUser];
                        console.log(result1)
                        result1.save()
                            .then(() => res.send("result saved "))
                            .catch((err) => next(err))

                    }
                    else{

                        f=1

                        for (let i = 0; i < result1.usersScores.length; i++) {
                            
                            if(result1.usersScores[i].email==newUser.email){
                                f=0
                                break
                            }
                            
                        }

                        if(f){

                            result1.usersScores.push(newUser)
                            console.log(result1)
                            result1.save()
                                .then(() => res.send("result saved "))
                                .catch((err) => next(err))

                        }
                        else{
                            next("User has already given the test")
                        }

                    } 

                }

            })
        }
    })
}

function viewResult(req, res, next) {
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



module.exports = [takeTest, submitTest , viewResult]