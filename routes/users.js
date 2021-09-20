const express = require('express');
const router = express.Router();
const {asyncHandler,validateEmailAndPassword,handleValidationErrors} = require('./utils')
const csrf = require("csurf")
const csrfProtection = csrf({cookie: true})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/login",csrfProtection,(req,res) =>{
    res.render("log-in",{token: req.csrfToken()})
})

router.get("/signup", csrfProtection,(req,res)=>{
  res.render("sign-up",{token: req.csrfToken()})
})

router.post("/login", validateEmailAndPassword,csrfProtection, asyncHandler( async (req,res,next)=>{
  const {email,password,stayLoggedIn} = req.body
      // if(stayLoggedIn)res.render("tasks") to be implemented with session storage
  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    // Attempt to get the user by their email address.
    const user = await db.User.findOne({ where: { email } });

    if (user !== null) {
      // If the user exists then compare their password
      // to the provided password.
      const passwordMatch = await bcrypt.compare(password, user.hashedPass.toString());

      if (passwordMatch) {
        // If the password hashes match, then login the user
        // and redirect them to the default route.
        // TODO Login the user.
        loginUser(req, res, user);
        return res.redirect('tasks');
      }
    }

    // Otherwise display an error message to the user.
    errors.push("Sorry, that wasn't a valid login. Please try again.");
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('log-in', {
    title: 'Login',
    emailAddress,
    errors,
    csrfToken: req.csrfToken(),
  });
}));



module.exports = router;
