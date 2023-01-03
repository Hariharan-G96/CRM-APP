const ticketNotificationController = require('../controllers/ticketNotification.controller')

module.exports = function(app){
    app.post('/notifyServ/api/notificationRequest/accept', ticketNotificationController.acceptNotificationRequest)
    app.get('/notifyServ/api/notification/find/:id', ticketNotificationController.getNotificationStatus)
}