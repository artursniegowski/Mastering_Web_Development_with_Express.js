// for loading the .env variables
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// OAuth for google
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// OAuth for Facebook
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');

// =============== const variables =================
// port on which the server will listen
// localhost:port
const port = process.env.PORT || 3000;

// database name
const databaseName = "userDB";
// example : mongodb://127.0.0.1:27017/wikiDB
const uriDB = (process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/")+databaseName;

// ========================== set up ================
// creating express app
const app = express();
// using EJS
app.set('view engine', 'ejs');
// using body parser in the object (app)
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
// now we can refer to static files with a relative path
app.use(express.static("public"));

// configuring the sessions
app.use(session({
    secret: 'secret session',
    resave: false,
    saveUninitialized: true,
}));


// init passport and sessions
app.use(passport.initialize());
app.use(passport.session());


// ====================== mongoDB configuration ========
// creating the connection to MongoDB Database
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(uriDB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// creating the schema for the userDB - user
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    // for google OAuth
    googleId: String,
    // for facebook OAuth
    facebookId: String,
    userSecret: String,
});

// adding passport-local-mongoose to the schema
userSchema.plugin(passportLocalMongoose);
// adding the findOrCreate static method
userSchema.plugin(findOrCreate);

// creating the collection in MongoDB
const User = mongoose.model("User", userSchema);


// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// using serialization and deserialization from 
// passport docs
// https://www.passportjs.org/concepts/authentication/
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
        });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

// for OAuth with google
// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_APP_CLIENT_ID,
    clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    // https://github.com/jaredhanson/passport-google-oauth2/issues/50
    // https://github.com/jaredhanson/passport-google-oauth2/pull/51
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOrCreate({ username: profile.id, googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


// for OAuth with Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOrCreate({ username: profile.id, facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



// ====================== routes =======================
// GET - home route: "/"
app.get("/", (req, res) => {
    res.render(
        'home'
    );
});

// for OAuth google
// GET - login with google : "/auth/google"
app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile'] }));

// GET - login with google : "/auth/google/secretes"
// google respons after login to the account 
// defined in the app
app.get('/auth/google/secrets', 
    passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect secret page.
            res.redirect('/secrets');
});


// for OAuth facebook
// GET - login with facebook : "/auth/facebook"
app.get('/auth/facebook',
  passport.authenticate('facebook'));

// GET - login with facebook : "/auth/facebook/secretes"
// facebook respons after login to the account 
// defined in the app
app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect secret page.
    res.redirect('/secrets');
});


// GET - submit route: "/submit"
app.get("/submit", (req, res) => {
    // if the user is registered and authenticaten
    // then there is no need of registering again, this info is in the
    // cookie - you can find it under inspect - applications
    if (req.isAuthenticated()) {
        // if user is authenticated then render the secrets
        res.render(
            'submit'
        ); 
    } else {
        res.redirect("/login");
    }
});

// POST - submit a secret: "/submit"
app.post("/submit", (req, res) => {
    // saving the secret that has been posted
    const submitedSecret = req.body.secret;
    // finding the curent logged user
    // passport save the urretn user into the request
    // console.log(req.user);
    User.findById(req.user.id, (error, foundUser) => {
        if (error) {
            console.log(error);
        } else {
            // if user found and exists
            if (foundUser){
                // updating in the databse the secrete
                foundUser.userSecret = submitedSecret;
                foundUser.save( (err) => {
                    // once the updating the databse is completed
                    // we can redirect the user to the secret page
                    res.redirect("/secrets");
                });
            }
        }
    });
});


// GET - login route: "/login"
app.get("/login", (req, res) => {
    res.render(
        'login'
    );
});

// GET - register route: "/register"
app.get("/register", (req, res) => {
    res.render(
        'register'
    );
});


// GET - register route: "/secrets"
app.get("/secrets", (req, res) => {
    // find all the secrete from the database
    User.find({"userSecret": {$ne:null}}, (error, foundUsers) => {
        if (error) {
            console.log(error)
        } else {
            // if no errors and we found users filling the above condition
            // so have a userSecret field that is not null
            if (foundUsers) {
                res.render(
                    'secrets',
                    {usersWithSecrets: foundUsers}
                );
            }
        }
    });
    
});



// GET - logout route: "/logout"
app.get("/logout", (req, res) => {
    // loggin out the user
    req.logout(function(err) {
        if (err) { 
            console.log(err); 
        }
        res.redirect('/');
      });
});

// POST - register route: "/register"
app.post("/register", (req, res) => {
    // https://www.npmjs.com/package/passport-local-mongoose
    // username has to be in the form !!!!
    User.register({username: req.body.username, email: req.body.username}, req.body.password, function (error, user) {
        if(error){
            console.log(error);
            res.redirect("/register");
        }else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/secrets');
            });
        }
    });
});

// POST - login route: "/login"
app.post("/login", (req, res) => {
    // create a user from the reques
    // username has to be in the form !!!!
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    // using passport to login the user
    req.login(user, function(err) {
        if (err) { 
            // if we cant find the user in the database
           console.log(err); 
        } else {
            // authenticate the user if foud - and no errors
            passport.authenticate('local')(req, res, function () {
                res.redirect('/secrets');
            });
        }
    });
});




// ============ database connection and server listetning
// connecting to the database before listening
connectDB().then(() => {
    // general message from the server - to know that is running
    app.listen(port, function() {
        console.log(`Server started on port ${port}`);
    });
});