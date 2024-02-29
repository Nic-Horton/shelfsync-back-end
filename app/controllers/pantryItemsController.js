const PantryItem = require('../models').PantryItem;

exports.show = async (request, response) => {
	return await PantryItem.findAll({ where: { userID: request.userId } }, {})
		.then((pantryItems) => {
			if (!pantryItems) {
				response.status(404).send({ error: 'No items not found' });
			} else {
				response.status(200).send(pantryItems);
			}
		})
		.catch((error) => response.status(400).send(error));
};

exports.create = async (request, response) => {
	return await PantryItem.create(
		{
			userID: request.userId,
			name: request.body.name,
			quantity: request.body.quantity,
			unit: request.body.unit,
			category: request.body.category,
		},
		{}
	).then((newPantryItem) =>
		PantryItem.findByPk(newPantryItem.id, {})
			.then((newPantryItem) => response.status(201).send(newPantryItem))
			.catch((error) => response.status(400).send(error))
	);
};

exports.delete = async (request, response) => {
	try {
		const { pantryItemId } = request.params;
		const pantryItem = await PantryItem.findByPk(pantryItemId);

		if (!pantryItem) {
			return response.status(404).send('Item not found');
		}

		await pantryItem.destroy();
		return response.status(204).send('Item deleted');
	} catch (error) {
		return response
			.status(500)
			.send('Error deleting pantry item: ' + error.message);
	}
};

exports.update = async (request, response) => {
	try {
		const { pantryItemId } = request.params;
		const { name, quantity, unit, category } = request.body;
		const updateFields = {};
		const pantryItem = await PantryItem.findByPk(pantryItemId);

		if (!pantryItem) {
			return response.status(404).send('Pantry item not found');
		}

		if (name !== undefined && name !== pantryItem.name) {
			updateFields.name = name;
		}
		if (quantity !== undefined && quantity !== pantryItem.quantity) {
			if (typeof quantity !== 'number') {
				return response.status(400).send('Quantity must be number');
			}
			if (quantity < 0) {
				return response.status(400).send('Quantity must be non-negative');
			}
			updateFields.quantity = quantity;
		}
		if (unit !== undefined && unit !== pantryItem.unit) {
			updateFields.unit = unit;
		}
		if (category !== undefined && category !== pantryItem.category) {
			updateFields.category = category;
		}

		// console.log(updateFields);
		if (Object.keys(updateFields).length === 0) {
			return response.status(400).send('Item record has nothing to update');
		}

		await pantryItem.update(updateFields);

		return response.status(200).send(pantryItem);
	} catch (error) {
		return response
			.status(500)
			.send('Error updating pantry item: ' + error.message);
	}
};

exports.search = async (request, response) => {
	const { search } = request.query;

	try {
		const pantryItems = await PantryItem.findAll({
			where: {
				[Op.and]: [
					{ userID: request.userId },
					{
						[Op.or]: [
							{
								name: {
									[Op.iLike]: '%' + search + '%',
								},
							},
							{
								category: {
									[Op.iLike]: '%' + search + '%',
								},
							},
						],
					},
				],
			},
		});

		if (pantryItems.length === 0) {
			return response.status(404).send('No items found');
		}

		return response.json(pantryItems);
	} catch (error) {
		response.status(500).send('Error searching pantry items: ' + error.message);
	}
};
