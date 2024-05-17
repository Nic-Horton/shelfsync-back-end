const { authorizeJwt } = require('../middleware');
const { renewJwt } = require('../middleware');
const usersController = require('../controllers').users;

module.exports = (app) => {
	app.get('/protected', [authorizeJwt.verifyToken], usersController.show);
	app.put(
		'/user',
		[authorizeJwt.verifyToken, renewJwt.renewToken],
		usersController.update
	);
};
