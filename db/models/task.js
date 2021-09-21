'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      taskName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      langId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Languages" },
      },
      notesId: {
        type: DataTypes.INTEGER,
        references: { model: "Notes" },
      },
      startDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      priority: DataTypes.BOOLEAN,
      backLog: DataTypes.BOOLEAN,
      sprintBacklog: DataTypes.BOOLEAN,
      complete: DataTypes.BOOLEAN,
    },
    {}
  );
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};