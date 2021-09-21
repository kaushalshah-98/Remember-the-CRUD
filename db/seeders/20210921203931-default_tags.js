'use strict';

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
     "Tags",
     [
       {
         name: "Personal",
         colorId: 16,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Work",
         colorId: 15,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Work",
         colorId: 15,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "JavaScript",
         colorId: 2,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Python",
         colorId: 8,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "C++",
         colorId: 19,
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
   return queryInterface.bulkDelete("Tags", null, {});
  }
};
