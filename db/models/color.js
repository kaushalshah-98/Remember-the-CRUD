'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    name: DataTypes.STRING
  }, {});
  Color.associate = function(models) {
    // associations can be defined here
  };
  return Color;
};