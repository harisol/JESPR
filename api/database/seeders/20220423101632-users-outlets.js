module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users_outlets',
    [
      {
        outlet_id: 1,
        user_id: 2,
      },
      {
        outlet_id: 2,
        user_id: 2,
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users_outlets', null, {}),
};