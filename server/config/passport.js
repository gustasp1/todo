const passport = require("passport");
const LocalStrategy = require("passport-local");
const { validPassword } = require("../lib/passwordUtils");
const connection = require("./db");
const User = connection.models.User;

const verifyCallback = (username, password, doneCb) => {
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return doneCb(null, false);
      }
      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return doneCb(null, user);
      } else {
        return doneCb(null, false);
      }
    })
    .catch((err) => {
      doneCb(err);
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
