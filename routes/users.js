const express = require("express");
const router = express.Router();
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
  incompletedSort,
} = require("./utils");
const { generateHashedPassword, checkPassword } = require("../bcrypt");
const db = require("../db/models");

const {
  loginUser,
  logoutUser,
  validateUser,
  loginDemoUser,
} = require("../auth");

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
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    const colors = await db.Color.findAll();

    const lists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });

    let tasks = lists.map(list => list.Tasks).flat();

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
      estHrs
    });
  })
);

router.post(
  "/tasks/Completed-Tasks",
  validateUser,
  asyncHandler(async (req, res) => {
    const { completedIds } = req.body;

    completedIds.forEach(async id => {
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
  asyncHandler(async (req, res) => {
    const { newList } = req.body;

    await db.List.create({
      name: newList,
      userId: req.session.auth.userId,
    });

    res.redirect("/users/tasks/All-Tasks");
  })
);

router.delete(
  "/tasks/Completed-Tasks",
  validateUser,
  asyncHandler(async (req, res) => {
    const { deletedIds } = req.body;

    deletedIds.forEach(async id => {
      const task = await db.Task.findByPk(id);
      await task.destroy();
    });
    res.redirect("/users/tasks/All-Tasks");
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

    let tasks = lists.map(list => list.Tasks).flat();

    tasks = completedSort(tasks);

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a,b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a,b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })

    const taskCount = tasks.length.toString();
    const tomorrowCount = 0;
    const completedCount = tasks.length.toString();
    const sortedBy = "Complete Tasks";
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);

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
      estHrs
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
      include: { model: db.Task, order: [["createdAt", "DESC"]]  },
    });

    let tasks = lists.map(list => list.Tasks).flat();
    tasks = tomorrowSort(tasks);

    let incompleteTasks = incompletedSort(tasks);
    incompleteTasks = incompleteTasks.sort((a,b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    })

    let completeTasks = completedSort(tasks);
    completeTasks = completeTasks.sort((a,b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })

    const taskCount = tasks.length.toString();
    const tomorrowCount = tasks.length.toString();
    const completedCount = completedSort(tasks).length.toString();
    const sortedBy = "Tomorrow";
    const estMinutes = estMin(tasks);
    const estHrs = estHours(tasks);

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
      estHrs
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

    let tasks = userLists.map(list => list.Tasks).flat();

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
    const tasks = userLists.map(list => list.Tasks).flat();
    res.json(tasks);
  })
);

router.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    const { taskName, langId, listId, estTime, startDate, dueDate, complete } =
      req.body;

    // creating task
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
      errors = validatorErrors.array().map(error => error.msg);
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
      const errors = validatorErrors.array().map(error => error.msg);
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
  let tasks2 = userLists3.map(list => list.Tasks).flat();
  tasks2 =  incompletedSort(tasks2);
  res.json({ tasks2 });
});
router.post("/search2", async (req, res) => {
  
  const userLists4 = await db.List.findAll({
    where: { userId: req.session.auth.userId },
    include: { model: db.Task },
  });
  let tasks3 = userLists4.map(list => list.Tasks).flat();
  tasks3 = completedSort(tasks3)
  res.json({ tasks3 });
});


module.exports = router;
