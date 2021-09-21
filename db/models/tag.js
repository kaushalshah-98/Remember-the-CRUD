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
  };
  return Tag;
};