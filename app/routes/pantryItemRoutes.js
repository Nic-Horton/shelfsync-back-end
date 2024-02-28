const { authorizeJwt } = require('../middleware');
const pantryItemsController = require('../controllers').pantryItems;

module.exports = (app) => {
	app.get(
		'/pantryItems',
		[authorizeJwt.verifyToken],
		pantryItemsController.show
	);
	app.post(
		'/pantryItems',
		[authorizeJwt.verifyToken],
		pantryItemsController.create
	);
	app.delete(
		'/pantryItems/:pantryItemId',
		[authorizeJwt.verifyToken],
		pantryItemsController.delete
	);
	app.put(
		'/pantryItems/:pantryItemId',
		[authorizeJwt.verifyToken],
		pantryItemsController.update
	);
	app.get(
		'/pantryItems/search',
		[authorizeJwt.verifyToken],
		pantryItemsController.search
	);
};
