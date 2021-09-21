'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      taskName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      langId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Languages" },
      },
      listId: {
        type: Sequelize.INTEGER,
        references: { model: "Lists" },
      },
      estTime: {
        type: Sequelize.INTEGER,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      priority: {
        type: Sequelize.BOOLEAN,
      },
      backlog: {
        type: Sequelize.BOOLEAN,
      },
      sprintBacklog: {
        type: Sequelize.BOOLEAN,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
      },
      complete: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};