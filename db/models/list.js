'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
      taskId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Tasks" },
      },
    },
    {}
  );
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};