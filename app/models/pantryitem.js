'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PantryItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			PantryItem.belongsTo(models.User, {
				foreignKey: 'userID',
				onDelete: 'CASCADE',
			});
		}
	}
	PantryItem.init(
		{
			userID: DataTypes.INTEGER,
			name: DataTypes.STRING,
			quantity: DataTypes.FLOAT,
			unit: DataTypes.STRING,
			category: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'PantryItem',
		}
	);
	return PantryItem;
};
