const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const credentials = require("./config/credentials");

const callbackURL = process.env.callbackURL || "https://comunitarios.herokuapp.com/api/google/callback" ;
//console.log("callbackURL");
//console.log(callbackURL);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: credentials.google.clientID,
  clientSecret: credentials.google.clientSecret,
  callbackURL: callbackURL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));
