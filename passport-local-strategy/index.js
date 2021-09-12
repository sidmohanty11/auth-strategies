const express = require("express");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes");

const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session setup
const sessionStore = MongoStore.create({ mongoUrl: process.env.DB_STRING });

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// passport init
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
