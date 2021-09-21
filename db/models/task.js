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
      listId: {
        type: DataTypes.INTEGER,
        references: { model: "Lists" },
      },
      estTime: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      priority: DataTypes.BOOLEAN,
      backlog: DataTypes.BOOLEAN,
      sprintBacklog: DataTypes.BOOLEAN,
      inProgress: DataTypes.BOOLEAN,
      complete: DataTypes.BOOLEAN,
    },
    {}
  );
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.List, { foreignKey: "listId" });
    Task.belongsTo(models.Language, { foreignKey: "langId" });
    Task.hasMany(models.Note, { foreignKey: "taskId" });
    const columnMapping = {
      through: "tagsJoin",
      otherKey: "tagsId",
      foreignKey: "taskId",
    };
    Task.belongsToMany(models.Tag, columnMapping)
  };
  return Task;
};