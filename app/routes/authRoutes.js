const { verifySignup } = require('../middleware');
const authController = require('../controllers').auth;

module.exports = (app) => {
	// Headers
	app.use((request, response, next) => {
		response.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		);
		next();
	});

	// Routes
	app.post(
		'/signup',
		[
			verifySignup.checkForDuplicateUsername,
			verifySignup.checkForDuplicateEmail,
		],
		authController.signUp
	);

	app.post('/signin', authController.signIn);
};
