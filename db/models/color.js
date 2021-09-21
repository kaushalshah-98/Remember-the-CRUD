'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: DataTypes.STRING
  }, {});
  Color.associate = function(models) {
    // associations can be defined here
    Color.hasMany(models.Tag, { foreignKey: "colorId" });
  };
  return Color;
};