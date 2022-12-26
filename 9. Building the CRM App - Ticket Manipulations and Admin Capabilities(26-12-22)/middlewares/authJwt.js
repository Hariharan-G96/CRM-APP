const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')
const constants = require('../utils/constants')
const User = require('../models/user.model')

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if(!token){
        res.status(403).send({
            message: "No token provided!"
        })
        return
    }

    jwt.verify(token, authConfig.secretKey, 
        (err, decoded) => {
            if(err){
                res.status(401).send({
                    message: "Unauthorized!"
                })
            }
            req.body.userId = decoded.userId
            next()
        })
}

const isAdmin = async (req, res, next) => {
    const user = await User.findOne({
        userId: req.body.userId
    })

    if(user && user.userType == constants.userTypes.admin){
        next()
    }else{
        res.status(403).send({
            message: "Require Admin Role!"
        })
        return
    }
}

module.exports = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}