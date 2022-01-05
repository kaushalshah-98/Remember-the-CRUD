# Remember-the-CRUD
Remember the CRUD is a task management app, designed to allow amateur and professional programmers to better organize their programming projects.

Live link: https://remember-the-crud.herokuapp.com/
Please refer to Wiki pages for further documentation.

## To start the development enviroment:
i. Clone the repository <br />
ii. Run npm install from the root of the project in your terminal to install any needed dependencies <br />
iii. Use the command npm start to launch the server <br />
iv. Go to the specified localhost port in the config/index.js file 

## Technologies implemented
* Javascript
* CSS
* Node.js
* Express
* Postgres
* Sequelize
* Pug

## Features
1. Main Page
   ![Alt text](https://wziller-personal-portfolio.s3.us-east-2.amazonaws.com/project-images/rtc-mainpage-screenshot.PNG)
   The site features a main page that displays all of the user's current and completed tasks.
2. Dynamic Sorting
   ![Alt text](https://wziller-personal-portfolio.s3.us-east-2.amazonaws.com/project-images/rtc-dynamic-sorting-screenshot.PNG)
   Throught the sidebaar a user is able tto sort their tasks by Category and Language.
3. Error Handling
   ![Alt text](https://wziller-personal-portfolio.s3.us-east-2.amazonaws.com/project-images/rtc-error-handling-screenshot.PNG)
   The add task compnenet utilizes Express validation to avoid invalid data being input by the user.
