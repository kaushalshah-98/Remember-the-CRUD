const express = require("express");
const router = express.Router();
const {
  asyncHandler,
  validateEmailAndPassword,
  handleValidationErrors,
  signUpValidator,
  csrfProtection,
  validationResult
} = require("./utils");
const { generateHashedPassword, checkPassword } = require("../bcrypt");
const db = require("../db/models");

const {
  loginUser,
  logoutUser,
} = require("../auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/login", csrfProtection, (req, res) => {
  res.render("log-in", { title:"Log In", csrfToken: req.csrfToken() });
});

router.get("/signup", csrfProtection, (req, res) => {
  res.render("sign-up", { title:"Sign Up", csrfToken: req.csrfToken() });
});

router.get("/tasks", (req, res) => {
  res.render("tasks", {title:"Tasks"});
});

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
        const passwordMatch = await checkPassword(
          password,
          user.password.toString()
        );

        if (passwordMatch) {
          // If the password hashes match, then login the user
          // and redirect them to the default route.
          // TODO Login the user.
          loginUser(req, res, user);
          res.redirect("/users/tasks");
        }
      }

      // Otherwise display an error message to the user.
      errors.push("Sorry, that wasn't a valid login. Please try again.");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    console.log(errors)
    res.render("log-in", {
      title: "Login",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
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
      user.password = hashedPass
      await user.save();
      loginUser(req, res, user);
      res.redirect("/users/tasks");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.log(errors)
      res.render("sign-up", {
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);


module.exports = router;
