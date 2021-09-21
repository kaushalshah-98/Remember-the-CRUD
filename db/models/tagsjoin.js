'use strict';
module.exports = (sequelize, DataTypes) => {
  const tagsJoin = sequelize.define(
    "tagsJoin",
    {
      taskId: {
        type: DataTypes.INTEGER,
        references: { model: "Tasks" },
      },
      tagsId: {
        type: DataTypes.INTEGER,
        references: { model: "Tags" },
      },
    },
    {}
  );
  tagsJoin.associate = function(models) {
    // associations can be defined here
  };
  return tagsJoin;
};