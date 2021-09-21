'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      message: DataTypes.TEXT,
      taskId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Tasks" },
      },
    },
    {}
  );
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.Task, { foreignKey: "taskId" });
  };
  return Note;
};