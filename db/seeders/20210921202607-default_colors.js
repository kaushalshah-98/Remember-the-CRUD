"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Colors",
      [
        {
          name: "Blue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "DarkBlue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Green",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "DarkGreen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Red",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Maroon",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pink",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fuchsia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Orange",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tomato",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Yellow",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gold",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Indigo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Violet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Black",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "WhiteSmoke",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Yellow",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PapayaWhip",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FireBrick",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Orchid",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Colors", null, {});
  },
};
