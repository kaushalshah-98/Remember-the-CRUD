const express = require("express");
const router = express.Router();
const { Task } = require("../db/models");
const {
  asyncHandler,
  validateEmailAndPassword,
  todaySort,
  tomorrowSort,
  completedSort,
  estMin,
  estHours,
  signUpValidator,
  csrfProtection,
  validationResult,
  check,
  incompletedSort,
  languageSort,
} = require("./utils");
const { generateHashedPassword, checkPassword } = require("../bcrypt");
const db = require("../db/models");

const {
  loginUser,
  logoutUser,
  validateUser,
  loginDemoUser,
} = require("../auth");

const tasksValidators = [
  check("taskName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a task name"),
  check("startDate")
    // .exists({ checkFalsy: true })
    .trim()
    // Custom validator
    .custom((startDate, { req }) => {
      // Fetch year, month and day of
      // respective dates
      const [sd, sm, sy] = startDate.split("-");
      const [ed, em, ey] = req.body.dueDate.split("-");

      // Constructing dates from given
      // string date input
      const startDate2 = new Date(sy, sm, sd);
      const dueDate2 = new Date(ey, em, ed);

      // Validate start date so that it must
      // comes before end date
      if (startDate2 > dueDate2) {
        throw new Error("Start date of task must be before due date of task");
      }
      return true;
    }),
  check("estTime")
    .isInt({ min: 1 })
    // .exists({ checkFalsy: true })
    .withMessage("Please provide an approximate amount of time for your task"),
 ];



        


// const listValidators = [
//   check("list")
//     .exists({ checkFalsy: true })
//     .withMessage("Please provide a valid name for your list"),
// ];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("splash", { title: "Welcome" });
});

router.get("/logout", function (req, res, next) {
  logoutUser(req, res);
});

router.get("/login", csrfProtection, (req, res) => {
  res.render("log-in", { title: "Log In", csrfToken: req.csrfToken() });
});

router.get(
  "/demo",
  asyncHandler(async (req, res) => {
    loginDemoUser(req, res);
  })
);

router.get("/signup", csrfProtection, (req, res) => {
  res.render("sign-up", { title: "Sign Up", csrfToken: req.csrfToken() });
});

router.get(
  "/tasks/All-Tasks",
  validateUser,
  //   tasksValidators,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    // const colors = await db.Color.findAll();

    const lists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });

    let tasks = lists.map((list) => list.Tasks).flat();

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const taskCount = tasks.length.toString();
    let errors = [];
    const tomorrowCount = tomorrowSort(tasks).length.toString();
    const completedCount = completedSort(tasks).length.toString();
    const sortedBy = "All Tasks";
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);
    const validatorErrors = validationResult(req);

    if (validatorErrors) {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      completeTasks,
      incompleteTasks,
      taskCount,
      tomorrowCount,
      completedCount,
      sortedBy,
      estMinutes,
      estHrs,
      errors,
    });
  })
);

router.post(
  "/tasks/Completed-Tasks",
  validateUser,
  asyncHandler(async (req, res) => {
    const { completedIds } = req.body;

    completedIds.forEach(async (id) => {
      const task = await db.Task.findByPk(id);
      task.complete = true;
      await task.save();
    });
    res.redirect("/users/tasks/All-Tasks");
  })
);

router.post(
  "/tasks/New-List",
  validateUser,
//   listValidators,
  asyncHandler(async (req, res) => {
    const { newList } = req.body;
    const validatorErrors = validationResult(req);
    // if (validatorErrors.isEmpty()) {
      await db.List.create({
        name: newList,
        userId: req.session.auth.userId,
      });

      res.redirect("/users/tasks/All-Tasks");
//     } else {
//         const errors = validatorErrors.array().map((error) => error.msg);
//        res.render("tasks", {
//         title: "Tasks",

//        })
//     }
//   })
  }));


router.delete(
  "/tasks",
  validateUser,
  asyncHandler(async (req, res) => {
    const { deletedIds } = req.body;
    deletedIds.forEach(async (id) => {

      const task = await db.Task.findByPk(id);
      await task.destroy();
    });
    res.sendStatus(200).end();
  })
);

router.delete(
  "/tagsjoins",
  validateUser,
  asyncHandler(async (req, res) => {
    const { deletedIds } = req.body;
    console.log("===================", deletedIds);
    deletedIds.forEach(async id => {
      const tags = await db.tagsJoin.findAll({
        where: { taskId: id },
      });
      if (tags.length) {
        tags.forEach(async tag => {
          await tag.destroy();
        });
      }
      res.sendStatus(200).end();
    });
  })
);

router.get(
  "/tasks/Completed-Tasks",
  validateUser,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    const lists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });

    let tasks = lists.map((list) => list.Tasks).flat();

    tasks = completedSort(tasks);

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const taskCount = tasks.length.toString();
    const tomorrowCount = 0;
    const completedCount = tasks.length.toString();
    const sortedBy = "Complete Tasks";
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);
    const errors = []
    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      incompleteTasks,
      completeTasks,
      taskCount,
      completedCount,
      tomorrowCount,
      sortedBy,
      estMinutes,
      estHrs,
      errors
    });
  })
);

router.get(
  "/tasks/Today",
  validateUser,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    const lists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });
    let tasks = lists.map((list) => list.Tasks).flat();
    tasks = todaySort(tasks);

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const taskCount = tasks.length.toString();
    const tomorrowCount = tomorrowSort(tasks).length;
    const completedCount = completedSort(tasks).length.toString();
    const sortedBy = "Today";
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);
    const errors = []

    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      incompleteTasks,
      completeTasks,
      taskCount,
      tomorrowCount,
      completedCount,
      sortedBy,
      estMinutes,
      estHrs,
      errors
    });
  })
);

//Get tomorrow tasks
router.get(
  "/tasks/Tomorrow",
  validateUser,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();

    const lists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });

    let tasks = lists.map((list) => list.Tasks).flat();
    tasks = tomorrowSort(tasks);

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const taskCount = tasks.length.toString();
    const tomorrowCount = tasks.length.toString();
    const completedCount = completedSort(tasks).length.toString();
    const sortedBy = "Tomorrow";
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);
    const errors = []

    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      incompleteTasks,
      completeTasks,
      taskCount,
      tomorrowCount,
      completedCount,
      sortedBy,
      estMinutes,
      estHrs,
      errors
    });
  })
);

//Get tasks list by language Id

router.get(
  "/tasks/languages/:id",
  validateUser,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    const userLists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: {
        model: db.Language,
        model: db.Task,
        order: [["createdAt", "DESC"]],
      },
    });

    const lists = await db.List.findAll({
      where: {
        userId: req.session.auth.userId,
      },
    });
    let tasks = userLists.map((list) => list.Tasks).flat();


    tasks = languageSort(tasks, req.params.id);

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const taskCount = tasks.length.toString();
    const tomorrowCount = tomorrowSort(tasks).length.toString();
    const completedCount = completedSort(tasks).length.toString();
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);
    const sortedBy = languages[req.params.id - 1].name;
    const errors = []
    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      incompleteTasks,
      completeTasks,
      tomorrowCount,
      completedCount,
      sortedBy,
      taskCount,
      estMinutes,
      estHrs,
      errors
    });
  })
);

//Get tasks list by list Id
router.get(
  "/tasks/:id",
  validateUser,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    const userLists = await db.List.findAll({
      where: { userId: req.session.auth.userId, id: req.params.id },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });

    const lists = await db.List.findAll({
      where: {
        userId: req.session.auth.userId,
      },
    });

    let tasks = userLists.map((list) => list.Tasks).flat();

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const taskCount = tasks.length.toString();
    const tomorrowCount = tomorrowSort(tasks).length.toString();
    const completedCount = completedSort(tasks).length.toString();
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);
    const sortedBy = userLists[0].name;
    const errors = []
    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      incompleteTasks,
      completeTasks,
      tomorrowCount,
      completedCount,
      sortedBy,
      taskCount,
      estMinutes,
      estHrs,
      errors
    });
  })
);

router.get(
  "/tasksArray",
  asyncHandler(async (req, res) => {
    const userLists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: db.Task,
    });
    const tasks = userLists.map((list) => list.Tasks).flat();
    res.json(tasks);
  })
);

router.post(
  "/tasks",
  tasksValidators,
  asyncHandler(async (req, res) => {
    const validatorErrors = validationResult(req);
    const { taskName, langId, listId, estTime, startDate, dueDate, complete } =
      req.body;

    const languages = await db.Language.findAll();
    // const colors = await db.Color.findAll();
    const lists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });

    let tasks = lists.map((list) => list.Tasks).flat();

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const taskCount = tasks.length.toString();
    const tomorrowCount = tomorrowSort(tasks).length.toString();
    const completedCount = completedSort(tasks).length.toString();
    const sortedBy = "All Tasks";
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);
    // const validatorErrors = validationResult(req);

    // creating task
    if (validatorErrors.isEmpty()) {
      await db.Task.create({
        taskName,
        langId,
        listId,
        estTime,
        startDate,
        dueDate,
        complete,
      });
      res.redirect(`/users/tasks/${listId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("tasks", {
        title: "Tasks",
        languages,
        lists,
        tasks,
        incompleteTasks,
        completeTasks,
        tomorrowCount,
        completedCount,
        sortedBy,
        taskCount,
        estMinutes,
        estHrs,
        errors,
      });
    }
  })
);

router.post(
  "/login",
  validateEmailAndPassword,
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });

      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password.

        const passwordMatch = await checkPassword(password, user.password);

        if (passwordMatch) {
          loginUser(req, res, user);
        }
      }
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
      res.render("log-in", {
        title: "Login",
        email,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.post(
  "/signup",
  csrfProtection,
  signUpValidator,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = db.User.build({
      firstName,
      lastName,
      email,
    });

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const hashedPass = await generateHashedPassword(password);
      user.password = hashedPass;
      await user.save();

      req.session.auth = {
        userId: user.id,
      };

      await db.List.create({
        name: "Inbox",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "Database Contruction",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "Mobile Optimization",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "Personal Website Update",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "New Employee On-Boarding",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "POS services",
        userId: req.session.auth.userId,
      });

      req.session.save(() => res.redirect("/users/tasks/All-Tasks"));
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("sign-up", {
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);
router.post("/search", async (req, res) => {
  const userLists3 = await db.List.findAll({
    where: { userId: req.session.auth.userId },
    include: { model: db.Task },
  });

  let tasks2 = userLists3.map((list) => list.Tasks).flat();

  tasks2 = incompletedSort(tasks2);
  res.json({ tasks2 });
});
router.post("/search2", async (req, res) => {
  const userLists4 = await db.List.findAll({
    where: { userId: req.session.auth.userId },
    include: { model: db.Task },
  });

  let tasks3 = userLists4.map((list) => list.Tasks).flat();

  tasks3 = completedSort(tasks3);
  res.json({ tasks3 });
});

module.exports = router;
