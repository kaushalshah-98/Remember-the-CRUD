'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "Users" },
      },
    },
    {}
  );
  List.associate = function(models) {
    // associations can be defined here
    List.belongsTo(models.User, { foreignKey: "userId" });
    List.hasMany(models.Task, { foreignKey: "listId" });
  };
  return List;
};