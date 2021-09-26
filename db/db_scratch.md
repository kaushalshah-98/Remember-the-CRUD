// formula to make seesion secret 
const { v4: uuidv4 } = require('uuid');

// magic code
npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all
