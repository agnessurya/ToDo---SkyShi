"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        title: "Groceries",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        title: "Projects",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        title: "Workouts",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Activities", data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Activities", null, {});
  },
};
