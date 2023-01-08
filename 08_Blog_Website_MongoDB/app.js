// for loading the .env variables
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
const mongoose = require("mongoose");


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

// example : mongodb://127.0.0.1:27017/todolistDB
const uriDB = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/blogDB";

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

// global variables - for the blog 
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// array of objects - post
let postsList = []


// creating posts schema for MongoDB - mongoose
const postsSchema = new mongoose.Schema({
  title:  {
    type: String,
    required: [true, 'the title of a post is required.']
  },
  body:  {
    type: String,
    required: [true, 'the body of a post is required.']
  },
});

// creating the collection in MongoDB
const Post = mongoose.model('Post',postsSchema);




// routes
// home - get
app.get("/", (req, res) => {
  // getting data fro the MongoDB database
  allPosts = Post.find({}, (err, foundPosts) => {
    // if no error, send all the posts to the home page
    if (!err) {
      res.render('home', {
        pageTitle: 'Home',
        startingContent: homeStartingContent,
        posts: foundPosts,
      })

    }
  });
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
  const title = req.body.postName
  const body = req.body.postContent

  // creating the new post
  const newPost = new Post({
    title: title,
    body: body,
  });

  // saving the new post to the database
  newPost.save((err) => {
    if (!err){
      // redirect to home
      res.redirect("/");
    }
  });
});

// post - detail view - get
app.get("/posts/:postId", (req, res) => {
  
    // by index
    const postId = req.params.postId
    // find elemnt by its ID
    Post.findById(postId, (err, postFound) => {
      // if no error
      if (!err) {
        // render the page wit the found post
        res.render(
          'post',{
          pageTitle: postFound.title ,
          content: postFound.body,
        })
      } else {
        // redirect home
        res.redirect("/");
      }
    });

});

// connecting to the database before listening
connectDB().then(() => {
  // general message from the server - to know that is running
  app.listen(port, function() {
    console.log(`Server started on port ${port}`);
  });
});
