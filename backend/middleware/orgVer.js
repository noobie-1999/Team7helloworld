// here will be middleware for org token verification
const jwt = require('jsonwebtoken')
const Org = require('../models/Orgs').Org
const secretKey = require('../config/keys').secretOrKey
function verify(req, res, next) {

    if (req.body.token == null) res.send({ err: "Token Not present" })
    // verify token

    jwt.verify(req.body.token, secretKey, (err, data) => {
        if (err) {
            next(err);
        }
        else {
            // check if the token club and give club are same
            // data will be there
            // check if club exists or not

            Org.find({ email: data.email}, (err, result) => {
                if (err) next(err);

                if (result == null) next({ err: "Invalid email" })
                else {

                    if (req.body.email != data.email) next({ err: "Email doesn't exists" })
                    // if club exists then its fine proceed
                    else next();
                }
            })
        }
    })

}

module.exports = { verify }