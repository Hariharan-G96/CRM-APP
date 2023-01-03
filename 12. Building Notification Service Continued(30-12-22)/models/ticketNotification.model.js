const mongoose = require('mongoose')

const ticketNotificationSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true
    },
    ticketId : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    recipientEmails : {
        type : [String],
        required : true
    },
    sentStatus : {
        type : String,
        required : true,
        default : "UNSENT"
    },
    requester : {
        type : String
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    }
})

module.exports = mongoose.model("Ticket_Notification", ticketNotificationSchema)