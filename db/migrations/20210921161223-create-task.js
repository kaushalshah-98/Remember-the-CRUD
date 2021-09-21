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
      startDate: {
        type: Sequelize.DATE,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      priority: {
        type: Sequelize.BOOLEAN,
      },
      backLog: {
        type: Sequelize.BOOLEAN,
      },
      sprintBacklog: {
        type: Sequelize.BOOLEAN,
      },
      complete: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};