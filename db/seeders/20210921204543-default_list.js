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
         name: "Inbox",
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "All Tasks",
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Today",
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Tomorrow",
         userId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "This Week",
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
