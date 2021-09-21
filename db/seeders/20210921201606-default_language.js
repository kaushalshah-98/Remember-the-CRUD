'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert(
     "Languages",
     [
       {
         name: "JavaScript",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "HTML",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "CSS",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "C",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "C++",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "C#",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Java",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Node.js",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Python",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "MySQL",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "PostgreSQL",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "PL/SQL",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Ruby On Rails",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "SQL",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "XML",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "XSL",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Go",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Pearl",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Groovy",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Rust",
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
   return queryInterface.bulkDelete("Languages", null, {});
  }
};



