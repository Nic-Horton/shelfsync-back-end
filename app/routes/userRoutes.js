const { authorizeJwt } = require('../middleware');
const usersController = require('../controllers').users;

module.exports = (app) => {
	app.get('/users/:userId', usersController.show);
	app.put('/users/:userId', [authorizeJwt.verifyToken], usersController.update);
};
