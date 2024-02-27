const PantryItem = require('../models').PantryItem;

exports.show = (request, response) => {
	return PantryItem.findByPk(request.params.pantryItemId, {})
		.then((pantryItem) => {
			if (!pantryItem) {
				response.status(404).send({ error: 'Item not found' });
			} else {
				response.status(200).send(pantryItem);
			}
		})
		.catch((error) => response.status(400).send(error));
};
