const usersController = require('../controllers').users;
const pantryItemsController = require('../controllers').pantryItems;

module.exports = (app) => {
	// Pantry Item routes //
	app.get('/pantryItems/:pantryItemId', pantryItemsController.show);

	// User routes //
	app.get('/users/:userId', usersController.show);
};
