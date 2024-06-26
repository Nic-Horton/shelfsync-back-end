const jwt = require('jsonwebtoken');
const config = require('../config/authConfig.js');

function verifyToken(request, response, next) {
	// let token = request.headers['x-access-token'];
	const token = request.cookies.accessToken;

	if (!token) return response.status(403).send({ error: 'No token provided' });

	jwt.verify(token, config.secret, (error, decoded) => {
		if (error) return response.status(401).send({ error: 'Unauthorized' });
		request.userId = decoded.id;
		next();
	});
}

module.exports = {
	verifyToken: verifyToken,
};
