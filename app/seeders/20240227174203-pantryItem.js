'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.bulkInsert('PantryItems', [
			{
				name: 'Milk',
				userID: 1,
				quantity: 1,
				unit: 'Cartons',
				category: 'Dairy',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Apples',
				userID: 1,
				quantity: 5,
				category: 'Fruit',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.bulkDelete('PantryItems', null, {});
	},
};
