const User = require('../models/user.model')
const { userTypes } = require('../utils/constants')
const constants = require('../utils/constants')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')

exports.signUp = async (req, res) => {
    let userStatus = req.body.userStatus;

    if(!userStatus){
        if(req.userType === userTypes.engineer || req.userType === userTypes.admin){
            userStatus = constants.userStatus.pending
        }
        else{
            userStatus = constants.userStatus.approved
        }
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
            userStatus: createUser.userStatus,
            createdAt : createUser.createdAt,
            updatedAt : createUser.updatedAt
        }

        res.status(201).send(postResponse)
    }catch(err){
        console.log('Something went wrong while saving to DB ', err.message)
        res.status(500).send({message : "Some internal error while inserting the element"})
    }
}