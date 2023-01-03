const cron = require('node-cron')
const Ticket_Notification = require('../models/ticketNotification.model')
const emailTransporter = require('../notifier/emailService')

cron.schedule('*/30 * * * * *', async () => {
    const notifications = await Ticket_Notification.find({
        sentStatus : "UNSENT"
    })
    console.log(`Count of unsent notifications ${notifications.length}`)

    notifications.forEach(notification => {
        const mailData = {
            from : 'crm.notification.service.provider@gmail.com',
            to : notification.recipientEmails,
            subject : notification.subject,
            text : notification.content
        }
        console.log(mailData)

        emailTransporter.sendMail(mailData, async (err, info) => {
            if(err){
                console.log(err.message)
            }
            else{
                console.log(info)
                const savedNotification = await Ticket_Notification.findOne({
                    _id : notification._id
                })
                savedNotification.sentStatus = "SENT"
                await savedNotification.save()
            }
        })
    })
})