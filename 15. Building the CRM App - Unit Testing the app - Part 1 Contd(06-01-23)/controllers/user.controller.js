/**
 * Controllers for the user resources.
 * Only the user of type ADMIN should be able to perform the operations
 * defined in the User Controller
 */

const User = require('../models/user.model')
const objectConverter = require('../utils/objectConverter')

const fetchAll = async (res) => {
    let users

    try{
        users = await User.find()
        return users
    }catch(err){
        console.log("error while fetching the users")
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const fetchByName = async(userNameReq, res) => {
    let users

    try{
        users = await User.find({
            name : userNameReq
        })
        return users
    }catch(err){
        console.log("error while fetching the users of userName : ", userNameReq)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const fetchByTypeAndStatus = async(userTypeReq, userStatusReq, res) => {
    let users

    try{
        users = await User.find({
            userType : userTypeReq,
            userStatus : userStatusReq
        })
        return users
    }catch(err){
        console.log(`error while fetching the users of userType [${userTypeReq}] and userStatus [${userStatusReq}]`)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const fetchByType = async(userTypeReq, res) => {
    let users

    try{
        users = await User.find({
            userType : userTypeReq
        })
        return users
    }catch(err){
        console.log(`error while fetching the users of userType [${userTypeReq}]`)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const fetchByStatus = async(userStatusReq, res) => {
    let users

    try{
        users = await User.find({
            userStatus : userStatusReq
        })
        return users
    }catch(err){
        console.log(`error while fetching the users of userStatus [${userStatusReq}]`)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

/**
 * Fetch the list of all users
 **/

exports.findAll = async (req, res) => {
    // http://localhost:3000/crm/api/users/
    let users
    let userNameReq = req.query.name
    let userTypeReq = req.query.userType
    let userStatusReq = req.query.userStatus

    if(userNameReq){
        users = await fetchByName(userNameReq, res)
    }
    else if(userTypeReq && userStatusReq){
        users = await fetchByTypeAndStatus(userTypeReq, userStatusReq, res)
    }
    else if(userTypeReq){
        users = await fetchByType(userTypeReq, res)
    }
    else if(userStatusReq){
        users = await fetchByStatus(userStatusReq, res)
    }
    else{
        users = await fetchAll(res)
    }

    if(users){
        res.status(200).send(objectConverter.userResponse(users))
    }
    else{
        res.status(500).send({
            message : 'No Users found!'
        })
    } 
}

exports.findById = async (req, res) => {
    // http://localhost:3000/crm/api/users/hari2564
    const userIdReq = req.params.userId
    let user

    try{
        user = await User.find({
            userId : userIdReq
        })

        if(user.length > 0){
            res.status(200).send(objectConverter.userResponse(user))
        }
        else{
            res.status(500).send({
                message: `User with id : [${userIdReq}] does not exist`
            })
        }
    } catch(err){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.update = async (req, res) => {
    // http://localhost:3000/crm/api/users/kanc2571
    const userIdReq = req.params.userId

    try{
        const user = await User.findOneAndUpdate({
            userId : userIdReq
        }, {
            userStatus : req.body.userStatus
        }).exec()

        if(user){
            res.status(200).send({
                message: `User record has been updated successfully`
            })
        }
        else{
            res.status(500).send({
                message : `Can't update! User with id : ${userIdReq} does not exist`
            })
            return
        }
    }catch(err){
        console.log("Error while updating the user record" , err.message)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}