// NotificationClient should be used in ticket controller since notification needs to be send during ticket manipulation activities
const Client = require('node-rest-client').Client
// used .Client because it is an object looks like {Client : [Function (anonymous)] }

const client = new Client();

module.exports = (subject, content, recipientEmails, requester, ticketId) => {
    let reqBody = {
        "subject" : subject,
        "content" : content,
        "recipientEmails" : recipientEmails,
        "requester" : requester,
        "ticketId" : ticketId
    }

    const args = {
        data : reqBody,
        headers : { "Content-Type" : "application/json" }
    }

    client.post("http://localhost:3030/notifyServ/api/notificationRequest/accept", args, (data, response) => {
        console.log("Request Sent")
        console.log(data)
    })
}