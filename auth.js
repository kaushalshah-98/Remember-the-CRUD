const validateUser = (req, res, next) => {
  
  if (!req.session.auth) {
    res.redirect("/users/login");
  } else {
    next();
  }
};

const loginUser = (req, res, user, listId) => {
  req.session.auth = {
    userId: user.id,
  };
  req.session.save(() => res.redirect(`/users/tasks/All-Tasks`));
};

const loginDemoUser = (req, res) => {
  req.session.auth = {
    userId: 1,
  };
  req.session.save(() => res.redirect("/users/tasks/All-Tasks"));
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
