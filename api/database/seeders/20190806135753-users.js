module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users',
    [
      {
        username: 'admin_1',
        role_id: 1,
      },
      {
        username: 'john_doe',
        role_id: 2,
      },
      {
        username: 'haris',
        role_id: 2,
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};