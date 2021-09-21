'use strict';
module.exports = (sequelize, DataTypes) => {
  const Languages = sequelize.define(
    "Languages",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Languages.associate = function(models) {
    // associations can be defined here
  };
  return Languages;
};