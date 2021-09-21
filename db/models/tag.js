'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      name: DataTypes.STRING,
      colorId: {
        type: DataTypes.INTEGER,
        references: { model: "Colors" },
      },
    },
    {}
  );
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsTo(models.Color, { foreignKey: "colorId" });
    const columnMapping = {
      through: "tagsJoin",
      otherKey: "taskId",
      foreignKey: "tagsId",
    };
    Tag.belongsToMany(models.Task, columnMapping);
  };
  return Tag;
};