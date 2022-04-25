module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "roles",
      [
        {
          rolename: 'admin',
        },
        {
          rolename: 'staff',
        },
      ],

      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("roles", null, {})
};
