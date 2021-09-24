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
     "Users",
     [
       {
         firstName: "Demo",
         lastName: "User",
         email: "demoUser@gmail.com",
         password:
           "$2a$10$s2eO6tmjJGz/v9KfckhmHu4xSdcIr9.OJVdBshcVz8UK8oOzpi8Hy",
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
   return queryInterface.bulkDelete("Users", null, {});
  }
};
