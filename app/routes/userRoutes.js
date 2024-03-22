const { authorizeJwt } = require('../middleware');
const usersController = require('../controllers').users;

module.exports = (app) => {
	app.get('/users/:userId', usersController.show);
	app.put('/user', [authorizeJwt.verifyToken], usersController.update);
};
