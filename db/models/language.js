'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    "Language",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Language.associate = function(models) {
    // associations can be defined here
    Language.hasMany(models.Task, { foreignKey: "langId" });
  };
  return Language;
};