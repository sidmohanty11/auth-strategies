const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;
const validPassword = require("../lib/passwordUtils").validPassword;

const verifyCallback = (username, password, done) => {
  User.findOne({ username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    const isValid = validPassword(password, user.hash, user.salt);
    if (!isValid) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
