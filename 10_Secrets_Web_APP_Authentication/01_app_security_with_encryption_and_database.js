// for loading the .env variables
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');


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
    password: {
        type: String,
        required: [true, 'the password for a user is required.']
    }
});

// for the mongoose - encrypt - adding the module
const secret = process.env.SECRETE_KEY_FOR_ENCRYPTION;
// it has to be create before creating mongoose model
// bc we are passing the schema there
// and we are encrypting only the one field which is password, if not defined it
// will encrypt the whole database
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });


// creating the collection in MongoDB
const User = mongoose.model("User", userSchema);


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

// POST - register route: "/register"
app.post("/register", (req, res) => {
    // creating a new user in the database
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    // saving the user to the databse
    newUser.save((error, result) => {
        if (error) {
            console.log(error);
        } else {
            // If save is successful, the returned promise will fulfill with the document saved.
            if (result === newUser){
                res.render('secrets');
            } else {
                console.log("Save was not successful!")
                res.redirect("/register");
            }
        }
    });
});

// POST - login route: "/login"
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // checking the credential if they exists in the database
    User.findOne(
        {email: email},
        (error, userFound) => {
            if (!error) {
                // if user exists, check the password
                if (userFound) {
                    // checking the password
                    if (userFound.password === password) {
                        res.render('secrets');
                    }else {
                        console.log("Wrong Password!");
                        res.redirect("/login");
                    }
                } else {
                    console.log("User dosent exists in the database!");
                    res.redirect("/login");
                }
            } else {
                console.log(error);
            }
        }
    );
});



// ============ database connection and server listetning
// connecting to the database before listening
connectDB().then(() => {
    // general message from the server - to know that is running
    app.listen(port, function() {
        console.log(`Server started on port ${port}`);
    });
});