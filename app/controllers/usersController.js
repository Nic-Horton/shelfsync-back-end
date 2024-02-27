const User = require('../models').User;
const PantryItem = require('../models').PantryItem;

const userOptions = {
	include: [
		{
			model: PantryItem,
		},
	],
};

exports.show = (request, response) => {
	return User.findByPk(request.params.userId, userOptions)
		.then((user) => {
			if (!user) {
				response.status(404).send({ error: 'User not found' });
			} else {
				response.status(200).send(user);
			}
		})
		.catch((error) => response.status(400).send(error));
};
