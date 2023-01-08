// for loading the .env variables
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');




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
    email: {
        type: String,
        required: [true, 'the email for a user is required.']
    },
    password: String
});

// adding passport-local-mongoose to the schema
userSchema.plugin(passportLocalMongoose);

// creating the collection in MongoDB
const User = mongoose.model("User", userSchema);


// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ====================== routes =======================
// GET - home route: "/"
app.get("/", (req, res) => {
    res.render(
        'home'
    );
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
    // if the user is registered and authenticaten
    // then ther is no need of registering again, this info is in the
    // cookie - you can find it under inspect - applications
    if (req.isAuthenticated()) {
        // if user is authenticated then render the secrets
        res.render(
            'secrets'
        ); 
    } else {
        res.redirect("/login");
    }
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