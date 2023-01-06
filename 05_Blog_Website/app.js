const express = require("express");
// for loading the .env variables
require('dotenv').config();
const bodyParser = require("body-parser");
const _ = require('lodash');
// const ejs = require("ejs");

// port on which the server will listen
// localhost:port
const port = process.env.PORT || 3000;

// creating express app
const app = express();
// using EJS
app.set('view engine', 'ejs');
// using body parser in the object (app)
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
// now we can refer to static files with a relative path
app.use(express.static("public"));

// global variables - for the blog 
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// array of objects - post
let postsList = []


// routes
// home - get
app.get("/", (req, res) => {
  res.render('home', {
    pageTitle: 'Home',
    startingContent: homeStartingContent,
    posts: postsList,
  })
});

// about - get
app.get("/about", (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    startingContent: aboutContent,
  })
});

// contact - get
app.get("/contact", (req, res) => {
  res.render('contact', {
    pageTitle: 'Contact',
    startingContent: contactContent,
  })
});

// compose - get
app.get("/compose", (req, res) => {
  res.render('compose', {
    pageTitle: 'Compose',
  })
});

// compose - post
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postName,
    body: req.body.postContent,
  };
  // adding post to the list
  postsList.push(post);
  // redirect to home
  res.redirect("/");
});

// post - detail view - get
app.get("/posts/:postId", (req, res) => {
  
  // by title
  // getting lower case with The string to escape
  // const requestedTitle = _.lowerCase(req.params.postId);

  // checking if title matches
    // postsList.forEach(element => {
    //   if( _.lowerCase(element.title) === requestedTitle) {
    //     res.render('post',{
    //       pageTitle: element.title ,
    //       content: element.body,
    //     });
        
    //   } 
    // });

    // by index
    const indexPost = req.params.postId
    // if it is not undefined it means it exists
    if (postsList[indexPost] !== undefined){
      res.render(
        'post',{
        pageTitle: postsList[indexPost].title ,
        content: postsList[indexPost].body,
      })
    } else {
      res.redirect("/");
    }

});


// general message from the server - to know that is running
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
