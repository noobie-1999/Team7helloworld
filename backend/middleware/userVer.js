const User = require('../models/User').User
const Org = require('../models/Orgs').Org
const jwt = require('jsonwebtoken')
const secretkey = require('../config/keys').secretOrKey


function verify(req, res, next) {
    if (req.body.token == null) next("Token Not present")
    // verify token
    jwt.verify(req.body.token, secretkey, (err, data) => {
        if (err) {
            next(err);
        } else {
            if (data.email != req.body.email) next({ err: "Token Invalid" })
            else User.findOne({ regNo: data.email }, (err, result) => {
                if (err) next(err)
                else {
                    if (result == null) next({ err: "No such user exists" })
                    else {
                        next();
                    }
                }

            })

        }
    })
}

module.exports = [verify]