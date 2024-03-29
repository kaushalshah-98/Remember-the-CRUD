const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// const csurf = require('csurf');
const app = express();
const {sessionSecret} = require("./config")
// view engine setup
app.set("view engine", "pug");

// app.use(csrf({cookie: true}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(cookieParser(sessionSecret));
app.use(
  session({
    secret: "0dc829fa-ce81-48ff-b82f-3747ef4289c3",
    store,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(cookieParser());

// create Session table if it doesn't already exist
store.sync();

app.use("/", usersRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app
