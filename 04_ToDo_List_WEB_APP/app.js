const bodyParser = require('body-parser');
const express = require('express');
// for loading the env variables
require('dotenv').config();
// custom module - created 
const date = require(__dirname + '/date.js');


// port on which the server will listen
// localhost:port
const port = process.env.PORT || 3000;

// creating express app
const app = express()
// using ejs
app.set('view engine', 'ejs');
// using body parser in the object (app)
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
// now we can refer to static files with a relative path
app.use(express.static("public"));

// global scope variable
// collection of new items
const newListItems = [];
const newWorkItems = [];

// routes
// home - get
app.get("/", (req, res)=>{

    // getting the day in specific form from our module
    const day = date.getDate()

    // rendering the list ejs file with the given variables
    res.render('list', {
        listTitle: day,
        newListItems: newListItems,
    });
   
});

// home - post
app.post("/", (req, res) => {
    if (req.body.list === "Work List"){
        // getting the users input form the form
        newWorkItems.push(req.body.newItem);
        // redirecting work
        res.redirect("/work");
    } else {
        // getting the users input form the form
        newListItems.push(req.body.newItem);
        // redirecting home
        res.redirect("/");
    }

});

// work - get
app.get("/work", (req, res)=>{

    // rendering the list ejs file with the given variables
    res.render('list', {
        listTitle: 'Work List',
        newListItems: newWorkItems,
    });
   
});

// about - get
app.get("/about", (req,res) => {
    res.render("about");
});


// general message from the server - to know that is running
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});