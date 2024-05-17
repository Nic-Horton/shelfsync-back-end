const jwt = require('jsonwebtoken');
const config = require('../config/authConfig.js');

function renewToken(request, response, next) {
	const token = request.cookies.accessToken;
	const decodedToken = jwt.decode(token);
	const now = Math.floor(Date.now() / 1000);

	// Check if the token will expire in the next 30 minutes
	if (decodedToken.exp - now < 30 * 60) {
		const newToken = jwt.sign(
			{ id: decodedToken.id, username: decodedToken.username },
			config.secret,
			{ expiresIn: '1h' }
		);
		response.cookie('accessToken', newToken, {
			httpOnly: true,
			secure: true,
			maxAge: 3600000,
		});
	}

	next();
}

module.exports = {
	renewToken: renewToken,
};
