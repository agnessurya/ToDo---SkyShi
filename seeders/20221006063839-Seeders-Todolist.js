"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        title: "Find Rice Cooker",
        status: "On Progress",
        priority: "Medium",
        activityID: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        title: "Buy Milk",
        status: "Complete",
        priority: "Low",
        activityID: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        title: "Rest API Project",
        status: "On Progress",
        priority: "High",
        activityID: 2,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        title: "Push Ups",
        status: "On Progress",
        priority: "Medium",
        activityID: 3,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Todolists", data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Todolists", null, {});
  },
};
