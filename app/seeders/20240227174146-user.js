'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.bulkInsert('Users', [
			{
				username: 'test',
				// email: 'test@test.com',
				password: '1234qwer',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.bulkDelete('Users', null, {});
	},
};
