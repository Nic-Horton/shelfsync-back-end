const pantryItemsController = require('../controllers').pantryItems;

module.exports = (app) => {
	app.get('/pantryItems/:pantryItemId', pantryItemsController.show);
};
