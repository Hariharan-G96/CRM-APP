const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service : "gmail",
    debug : true,
    auth : {
        user : 'crm.notification.service.provider@gmail.com',
        pass : 'eagoksflvtnouuzi'
    }
})