const authJwt = require('../middlewares/authJwt')
const userController = require('../controllers/user.controller')

module.exports = function(app){
    app.get('/crm/api/users/', [authJwt.verifyToken, authJwt.isAdmin], userController.findAll)
    // jwt token -> userId -> response
    app.get('/crm/api/users/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.findById)
    app.put('/crm/api/users/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.update)
}