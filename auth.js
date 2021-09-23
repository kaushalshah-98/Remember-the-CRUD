const validateUser = (req, res, next) => {
  console.log(req.session.auth);
  if (!req.session.auth) {
    res.redirect("/users/login");
  } else {
    next();
  }
};

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
  console.log(req.session.auth);

  req.session.save(() => res.redirect("/users/tasks"));
};

const loginDemoUser = (req, res) => {
  req.session.auth = {
    userId: "Demo",
  };
  console.log(req.session.auth);

  req.session.save(() => res.redirect("/users/tasks"));
};

const logoutUser = (req, res) => {
  delete req.session.auth;
  res.redirect("/users/login");
};

module.exports = {
  loginDemoUser,
  loginUser,
  logoutUser,
  validateUser,
};
