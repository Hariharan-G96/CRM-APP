const ticketController = require('../controllers/ticket.controller')
const authJwt = require('../middlewares/authJwt')

module.exports = function(app){
    app.post('/crm/api/ticket/create/', [authJwt.verifyToken], ticketController.createTicket)
    app.put('/crm/api/ticket/update/:id', [authJwt.verifyToken], ticketController.updateTicket)
    app.get('/crm/api/tickets/view/', [authJwt.verifyToken], ticketController.getAllTickets)
    app.get('/crm/api/tickets/view/:id', [authJwt.verifyToken], ticketController.getTicketById)
}