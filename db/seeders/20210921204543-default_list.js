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
     "Lists",
     [
       {
         name: "Database Contruction",
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "New Employee On-Boarding",
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Mobile Optimization",
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "POS services",
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Personal Website Update",
         userId: 1,
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
   return queryInterface.bulkDelete("Lists", null, {});
  }
};
