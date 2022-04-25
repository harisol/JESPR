module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "outlets",
      [
        {
          name: 'KFC',
        },
        {
          name: 'Sederhana',
        },
        {
          name: 'Pagi Sore',
        },
        {
          name: 'HokBen',
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("outlets", null, {})
};
