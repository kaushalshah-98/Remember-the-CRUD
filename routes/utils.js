const db = require("../db/models");
const { check, validationResult } = require("express-validator");
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });


const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const signUpValidator = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required")
    .isLength({ max: 50 })
    .withMessage("First name must not be more than 50 characters long"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required")
    .isLength({ max: 50 })
    .withMessage("Last name must not be more than 50 characters long"),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(`${user.email} is in use.`);
        }
      });
    }),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Minimum is 5 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
];

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("email wrong"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Sorry, that wasn't a valid login. Please try again."),
];
//taskSorting Functions
const todaySort = (tasks) => {

}

const tomorrowSort = (tasks) => {

};

const thisWeekSort = (tasks) => {

};

const completedSort = (tasks) => {
  let res = [];
  tasks.forEach(task => {
    if(task.complete) res.push(task)
  })
  return res;
};

const incompletedSort = (tasks) => {
  let res = [];
  tasks.forEach(task => {
    if(!task.complete) res.push(task)
  })
  return res;
};

module.exports = {
  asyncHandler,
  validateEmailAndPassword,
  signUpValidator,
  csrfProtection,
  completedSort,
  validationResult,
  incompletedSort
};
