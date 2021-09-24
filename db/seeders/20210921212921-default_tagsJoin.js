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
     "tagsJoins",
     [
       {
         taskId: 1,
         tagsId: 1,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
        taskId: 2,
        tagsId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: 3,
        tagsId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: 4,
        tagsId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: 5,
        tagsId: 5,
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
   return queryInterface.bulkDelete("tagsJoins", null, {});
  }
};
