const database = require('../models');
const config = require('../config/authConfig.js');
const User = database.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUp = (request, response) => {
	return User.create({
		username: request.body.username,
		email: request.body.email,
		password: bcrypt.hashSync(request.body.password, 10),
	})
		.then((newUser) => response.status(201).send(newUser))
		.catch((error) => response.status(500).send(error));
};

exports.signIn = (request, response) => {
	const signInError = {
		accessToken: null,
		error: 'Invalid username or password',
	};

	return User.findOne({ where: { username: request.body.username } })
		.then((user) => {
			if (!user) return response.status(401).send(signInError);
			const validPassword = bcrypt.compareSync(
				request.body.password,
				user.password
			);

			if (!validPassword) return response.status(401).send(signInError);

			const token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400,
			});

			response.cookie('accessToken', token, { httpOnly: true, secure: true });

			response
				.status(200)
				.send({ id: user.id, username: user.username, accessToken: token });
		})
		.catch((error) => response.status(500).send(error));
};

exports.signOut = (request, response) => {
	response.clearCookie('accessToken');

	response.status(200).send('You have been successfully signed out.');
};
