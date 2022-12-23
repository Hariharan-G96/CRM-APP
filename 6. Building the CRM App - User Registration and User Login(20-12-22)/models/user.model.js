const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        lowerCase : true,
        unique : true,
        minLength : 10,
        isEmail : true
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER"
    },
    userStatus : {
        type : String,
        required : true,
        default : "APPROVED"
    }
})

module.exports = mongoose.model('User', userSchema)