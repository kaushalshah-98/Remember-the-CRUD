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
     "Tasks",
     [
      {
        taskName: "Create event listners buttons on site",
        langId: 1,
        listId: 5,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Add media querys to properly resize based on screen",
        langId: 3,
        listId: 3,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Seed proper demo user data",
        langId: 11,
        listId: 5,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Fix association errors between models",
        langId: 11,
        listId: 1,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Create proper constarints in the users migration",
        langId: 11,
        listId: 1,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Update schema with new join table",
        langId: 10,
        listId: 1,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Create proper constarints in the users migration",
        langId: 11,
        listId: 1,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Create proper constarints in the users migration",
        langId: 11,
        listId: 1,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Restyle page when on a mobile device/tablet",
        langId: 9,
        listId: 3,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Send an update with new menu data",
        langId: 9,
        listId: 4,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "Fix non functional menu on pos main screen",
        langId: 9,
        listId: 4,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },   {
        taskName: "Update math function to properly count change",
        langId: 9,
        listId: 4,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },   {
        taskName: "input new employees database information",
        langId: 14,
        listId: 2,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },   {
        taskName: "Give Brad superuser permissions",
        langId: 14,
        listId: 2,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },   {
        taskName: "Seed the employees personal info in the database",
        langId: 11,
        listId: 2,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },   {
        taskName: "Update companys site to reflect changes to employees",
        langId: 1,
        listId: 2,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },   {
        taskName: "Make a search function for site",
        langId: 1,
        listId: 5,
        estTime: 20,
        startDate: null,
        dueDate: null,
        complete: false,
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
   return queryInterface.bulkDelete("Tasks", null, {});
  }
};
