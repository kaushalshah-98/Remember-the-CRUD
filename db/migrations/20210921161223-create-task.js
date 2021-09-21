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
      notesId: {
        type: Sequelize.INTEGER,
        references: { model: "Notes" },
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