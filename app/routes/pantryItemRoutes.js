const { authorizeJwt } = require('../middleware');
const { renewJwt } = require('../middleware');
const pantryItemsController = require('../controllers').pantryItems;

module.exports = (app) => {
	app.get(
		'/pantryItems',
		[authorizeJwt.verifyToken, renewJwt.renewToken],
		pantryItemsController.show
	);
	app.post(
		'/pantryItems',
		[authorizeJwt.verifyToken, renewJwt.renewToken],
		pantryItemsController.create
	);
	app.delete(
		'/pantryItems/:pantryItemId',
		[authorizeJwt.verifyToken, renewJwt.renewToken],
		pantryItemsController.delete
	);
	app.put(
		'/pantryItems/:pantryItemId',
		[authorizeJwt.verifyToken, renewJwt.renewToken],
		pantryItemsController.update
	);
	app.get(
		'/pantryItems/search',
		[authorizeJwt.verifyToken, renewJwt.renewToken],
		pantryItemsController.search
	);
};
