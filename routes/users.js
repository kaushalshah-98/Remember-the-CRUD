const express = require("express");
const router = express.Router();
const {
  asyncHandler,
  validateEmailAndPassword,
  todaySort,
  completedSort,
  signUpValidator,
  csrfProtection,
  validationResult,
  incompletedSort
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
    // const email = "demo@rtc.com";
    // const user = await db.User.findOne({ where: { email } });
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
    // const lists = await db.List.findAll();
    const colors = await db.Color.findAll();
    const lists = await db.List.findAll({
      // where:{userId:req.session.auth.userId},
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });
    // console.log(userLists);
    // let userTags = new Set();

    let tasks = lists.map(list => list.Tasks).flat();

    // below provides the tags list when creating a new task
    // for (let i = 0; i < lists.length; i++) {
    //   const list = lists[i];
    //   let Tasks = list.Tasks;
    //   for (let j = 0; j < Tasks.length; j++) {
    //     const task = Tasks[j];
    //     let Tags = task.Tags;
    //     for (let k = 0; k < Tags.length; k++) {
    //       const tag = Tags[k];
    //       userTags.add(tag.name);
    //     }
    //   }
    // }
    tasks = incompletedSort(tasks)
    const taskCount = tasks.length.toString();
    // tags = Array.from(userTags);

    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      taskCount,
      // tags,
      colors,
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
      await task.save()
    });
    res.redirect('/users/tasks/All-Tasks')
  })
);

router.get(
  "/tasks/Completed-Tasks",
  validateUser,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    // const lists = await db.List.findAll();
    const colors = await db.Color.findAll();
    const lists = await db.List.findAll({
      // where:{userId:req.session.auth.userId},
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });

    let userTags = new Set();

    let tasks = lists.map(list => list.Tasks).flat();
    tasks = completedSort(tasks);
    // below provides the tags list when creating a new task
    // for (let i = 0; i < lists.length; i++) {
    //   const list = lists[i];
    //   let Tasks = list.Tasks;
    //   for (let j = 0; j < Tasks.length; j++) {
    //     const task = Tasks[j];
    //     let Tags = task.Tags;
    //     for (let k = 0; k < Tags.length; k++) {
    //       const tag = Tags[k];
    //       userTags.add(tag.name);
    //     }
    //   }
    // }

    const taskCount = tasks.length.toString();
    tags = Array.from(userTags);

    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      taskCount,
      tags,
      colors,
    });
  })
);

//Get tasks list by list Id
router.get(
  "/tasks/:id",
  validateUser,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    let tags = await db.Tag.findAll();
    const colors = await db.Color.findAll();

    const userLists = await db.List.findAll({
      // where:{userId:req.session.auth.userId},
      where: { userId: req.session.auth.userId, id: req.params.id },
      include: { model: db.Task, order: [["createdAt", "DESC"]] },
    });

    // const userTaskLists = await db.List.findOne({
    //   // where:{userId:req.session.auth.userId},
    //   where: { userId: req.session.auth.userId, id: req.params.id },
    //   include: { model: db.Task, order: [['createdAt', 'DESC']], include: db.Tag},
    // });

    console.log(userLists[0].Tasks);

    const lists = await db.List.findAll({
      where: {
        userId: req.session.auth.userId,
      },
    });
    //below generates all user tags

    const tagsLists = await db.List.findAll({
      // where:{userId:req.session.auth.userId},
      where: { userId: req.session.auth.userId },
      include: { model: db.Task, include: db.Tag },
    });

    let userTags = new Set();

   let tasks = userLists.map(list => list.Tasks).flat();
   tasks = incompletedSort(tasks)

    // below provides the tags list when creating a new task
    // for (let i = 0; i < tagsLists.length; i++) {
    //   const list = tagsLists[i];
    //   let Tasks = list.Tasks;
    //   for (let j = 0; j < Tasks.length; j++) {
    //     const task = Tasks[j];
    //     let Tags = task.Tags;
    //     for (let k = 0; k < Tags.length; k++) {
    //       const tag = Tags[k];
    //       userTags.add(tag.name);
    //     }
    //   }
    // }

    // tags = Array.from(userTags);
    const taskCount = tasks.length.toString();
    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      taskCount,
      // tags,
      colors,
      userTags,
    });
  })
);

router.get(
  "/tasksArray",
  asyncHandler(async (req, res) => {
    // const languages = await db.Language.findAll();
    //   const lists = await db.List.findAll({
    //     where: {
    //       userId: req.session.auth.userId,
    //     },
    //   });
    const userLists = await db.List.findAll({
      // where:{userId:req.session.auth.userId},
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
    const { email, password, stayLoggedIn } = req.body;
    // if(stayLoggedIn)res.render("tasks") to be implemented with session storage
    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      // Attempt to get the user by their email address.
      const user = await db.User.findOne({ where: { email } });

      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password.
        console.log(user.password);
        console.log(password);
        const passwordMatch = await checkPassword(password, user.password);
        console.log(passwordMatch);
        if (passwordMatch) {
          // If the password hashes match, then login the user
          // and redirect them to the default route.
          // TODO Login the user.
          const userAllTaskList = await db.List.findOne({
            where: {
              userId: user.id,
              name: "All Tasks",
              order: [["createdAt", "DESC"]],
            },
          });
          console.log("hi");
          loginUser(req, res, user, userAllTaskList.id);
          // res.redirect("/users/tasks");
        }
      }

      // Otherwise display an error message to the user.
      errors.push("line 104");
    } else {
      errors = validatorErrors.array().map(error => error.msg);
      res.render("log-in", {
        title: "Login",
        email,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
    console.log(errors);
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

module.exports = router;
