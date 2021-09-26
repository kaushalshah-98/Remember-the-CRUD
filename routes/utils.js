const db = require("../db/models");
const { check, validationResult } = require("express-validator");
const csrf = require("csurf");
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
const dateToDay = (date) => {
  if (date === null) return;
  let res = date.toString();
  res = res.split(" ");
  res = res.splice(0, 4);
  return res.join(" ");
};

const estHours = (tasks) => {
  let totalTime = 0;
  tasks.forEach((task) => {
    totalTime += task.estTime;
  });
  return Math.floor(totalTime / 60);
};

const estMin = (tasks) => {
  let totalTime = 0;

  tasks.forEach((task) => {
    totalTime += task.estTime;
  });
  return Math.floor(totalTime % 60);
};

const todaySort = (tasks) => {
  let today = new Date();
  today.setDate(today.getDate());
  tomorrow.setDate(tomorrow.getDate() + 1);

  let res = [];


  today = dateToDay(today);

  tasks.forEach((task) => {
    if (dateToDay(today) === dateToDay(task.dueDate)) {
      res.push(task);
    }
  });
  return res;
};

const tomorrowSort = (tasks) => {
  let today = new Date();
  let tomorrow = new Date(today);

  let res = [];

  tomorrow = dateToDay(tomorrow);

  tasks.forEach((task) => {
    if (dateToDay(tomorrow) === dateToDay(task.dueDate)) {
      res.push(task);
    }
  });
  return res;
};

const completedSort = (tasks) => {
  let res = [];
  tasks.forEach((task) => {
    if (task.complete) res.push(task);
  });
  return res;
};

const incompletedSort = (tasks) => {
  let res = [];
  tasks.forEach((task) => {
    if (!task.complete) res.push(task);
  });
  return res;
};

const languageSort = (tasks, id) => {
  
  let res = [];
  tasks.forEach((task) => {
    if (task.langId.toString() === id) res.push(task);
  });
  return res;
};


module.exports = {
  asyncHandler,
  validateEmailAndPassword,
  signUpValidator,
  csrfProtection,
  completedSort,
  validationResult,
  incompletedSort,
  todaySort,
  tomorrowSort,
  languageSort,
  estMin,
  estHours,
};
