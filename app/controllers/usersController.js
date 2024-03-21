const bcrypt = require('bcrypt');
const User = require('../models').User;

exports.show = (request, response) => {
	return User.findByPk(request.params.userId)
		.then((user) => {
			if (!user) {
				response.status(404).send({ error: 'User not found' });
			} else {
				response.status(200).send(user);
			}
		})
		.catch((error) => response.status(400).send(error));
};

exports.update = async (request, response) => {
	try {
		const { userId } = request.params;
		const { password } = request.body;
		const updateFields = {};
		const user = await User.findByPk(userId);

		if (!user) {
			return response.status(404).json({ error: 'User not found' });
		}

		// if (email !== undefined && email !== user.email) {
		// 	updateFields.email = email;
		// }

		if (password !== undefined) {
			const isSamePassword = bcrypt.compareSync(password, user.password);

			if (!isSamePassword) {
				const hashedPassword = bcrypt.hashSync(password, 10);
				updateFields.password = hashedPassword;
			} else {
				return response
					.status(400)
					.json({ error: 'New password must not match the current password' });
			}
		}

		if (Object.keys(updateFields).length === 0) {
			return response.status(400).send('Nothing to update');
		}

		await user.update(updateFields);

		response.status(200).json({ message: 'User updated successfully' });
	} catch (error) {
		console.error('Error updating user:', error);
		response.status(500).json({ error: 'Internal server error' });
	}
};
