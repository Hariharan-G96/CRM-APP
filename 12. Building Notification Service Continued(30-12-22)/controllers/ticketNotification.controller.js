const Ticket_Notification = require('../models/ticketNotification.model')

/**
 * This controller adds a new unsent notification to our db
 */

exports.acceptNotificationRequest = async (req, res) => {
    // http://localhost:3030/notifyServ/api/notificationRequest/accept
    const notificationObject = {
        subject : req.body.subject,
        content : req.body.content,
        recipientEmails : req.body.recipientEmails,
        requester : req.body.requester,
        ticketId : req.body.ticketId
    }

    try{
        const notification = await Ticket_Notification.create(notificationObject)
        res.status(200).send({
            requestId : notification.ticketId,
            status : "Ticket notification request has been accepted"
        })
    } catch(err){
        console.log(`Error while accepting a notification request : ${err.message}`)
        res.status(500).send({
            message : "Internal Server Error!"
        })
    }
}

/**
 * This controller tells the client the current status of a
 * notification.
 */

exports.getNotificationStatus = async (req, res) => {
    // http://localhost:3030/notifyServ/api/notification/find/:id
    const reqId = req.params.id
    
    try{
        const notification = await Ticket_Notification.findOne({
            ticketId : reqId
        })

        res.status(200).send({
            requestId : notification.ticketId,
            subject : notification.subject,
            content : notification.content,
            recipientEmails : notification.recipientEmails,
            sentStatus : notification.sentStatus
        })
    } catch(err){
        console.log(`Error while fetching a notification request : ${err.message}`)
        res.status(500).send({
            message : "Internal Server Error!"
        })
    }
}