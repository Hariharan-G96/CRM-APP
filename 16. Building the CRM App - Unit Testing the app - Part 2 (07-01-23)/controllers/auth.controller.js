const User = require('../models/user.model')
const { userTypes } = require('../utils/constants')
const constants = require('../utils/constants')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')

exports.signUp = async (req, res) => {
    // http://localhost:3000/crm/api/auth/signup   
    let userStatus;

    if(req.body.userType === userTypes.engineer || req.body.userType === userTypes.admin){
        userStatus = constants.userStatus.pending
    }
    else{
        userStatus = constants.userStatus.approved
    }

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password, 8),
        userStatus : userStatus
    }

    try{
        const createUser = await User.create(userObj)
        const postResponse = {
            name : createUser.name,
            userId : createUser.userId,
            email : createUser.email,
            userType : createUser.userType,
            userStatus: createUser.userStatus
        }

        res.status(201).send(postResponse)
    }catch(err){
        console.log('Something went wrong while saving to DB ', err.message)
        res.status(500).send({message : "Some internal error while inserting the element"})
    }
}

exports.signIn = async (req, res) => {
    // http://localhost:3000/crm/api/auth/signin
    const user = await User.findOne({ userId : req.body.userId })
    console.log("Sign in request for ", user)

    if(!user){
        res.status(400).send({
            message: "Failed! UserId doesn't exist!"
        })
        return
    }

    if(user.userStatus != constants.userStatus.approved){
        res.status(403).send({
            message: `Can't allow login as user is in status: [${user.userStatus}]`
        })
        return
    }

    let isValidPassword = bcrypt.compareSync(req.body.password, user.password)

    if(!isValidPassword){
        res.status(401).send({
            accessToken : null,
            message: 'Invalid Credentials!'
        })
        return
    }

    let token = jwt.sign({ userId: user.userId }, config.secretKey, { 
        expiresIn : 86400 // 24 hours
    })

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        accessToken: token
    })
}