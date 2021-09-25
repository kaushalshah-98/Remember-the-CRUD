const express = require("express");
const router = express.Router();
const {
  asyncHandler,
  validateEmailAndPassword,
  handleValidationErrors,
  signUpValidator,
  csrfProtection,
  validationResult,
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
  "/tasks",
  validateUser,
  asyncHandler(async (req, res) => {
    const languages = await db.Language.findAll();
    let tags = await db.Tag.findAll();
    const colors = await db.Color.findAll();

    const userLists = await db.List.findAll({
      where: { userId: req.session.auth.userId },
      include: {model:db.Task, include: db.Tag}
    });


    const lists = await db.List.findAll({
      where: {
        userId: req.session.auth.userId,
      },
    });


    let userTags = new Set();

    const tasks = userLists.map((list) => list.Tasks).flat();

    console.log(tasks)
  // userLists.forEach(List => {
  //   List.Tasks.forEach((task) => {
  //     task.Tags.forEach((tag) => {
  //       console.log(tag);
  //     })
  //   })
  // })
    console.log("hit---------------->")
  for (let i = 0; i < userLists.length; i++) {
    const list = userLists[i];
    let Tasks = list.Tasks

      for (let j = 0; j < Tasks.length; j++) {
        const task = Tasks[j];
        let Tags = task.Tags
        // console.log(Tags)
          for (let k = 0; k < Tags.length; k++) {
            const tag = Tags[k];
            userTags.add(tag.name)
          }

      }

  }
  console.log()
  userTags = Array.from(userTags);
  // console.log(tags)
    res.render("tasks", {
      title: "Tasks",
      languages,
      lists,
      tasks,
      tags,
      colors,
      userTags
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
    const tasks = userLists.map((list) => list.Tasks).flat();
    res.json(tasks);
  })
);

router.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    const {
      taskName,
      langId,
      listId,
      estTime,
      startDate,
      dueDate,
      priority,
      backlog,
      sprintBacklog,
      inProgress,
      complete,
    } = req.body;

    // creating task
    await db.Task.create({
      taskName,
      langId,
      listId,
      estTime,
      startDate,
      dueDate,
      priority,
      backlog,
      sprintBacklog,
      inProgress,
      complete,
    });
    res.redirect("/users/tasks");
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
          console.log("hi");
          loginUser(req, res, user);
          // res.redirect("/users/tasks");
        }
      }

      // Otherwise display an error message to the user.
      errors.push("line 104");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
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
    const { firstName, lastName, email, username, password } = req.body;
    const user = db.User.build({
      firstName,
      lastName,
      email,
      username,
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
        name: "All Tasks",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "Inbox",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "Today",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "Tomorrow",
        userId: req.session.auth.userId,
      });

      await db.List.create({
        name: "This Week",
        userId: req.session.auth.userId,
      });

      req.session.save(() => res.redirect("/users/tasks"));
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
router.post('/search',async (req, res, next) => {
  const {searchString} = req.body
  const userLists3 = await db.List.findAll({
    where: { userId: req.session.auth.userId },
    include: {model:db.Task, include: db.Tag}
  });
  const tasks2 = userLists3.map((list) => list.Tasks).flat()
  console.log(tasks2)
  res.json({tasks2})
});

// router.get('/tasks/search-results',async (req,res,next) =>{
//   console.log(req.query)
//   const userLists2 = await db.List.findAll({
//     where: { userId: req.session.auth.userId },
//     include: {model:db.Task, include: db.Tag}
//   });
//   const tasks2 = await db.Task.findAll(req.query)
//   res.setHeader('Content-Type', 'application/json');
//   res.end(JSON.stringify(data.filter(value => value.includes(req.query.q))));

// })

module.exports = router;
