// for loading the .env variables
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// =============== const variables =================
// port on which the server will listen
// localhost:port
const port = process.env.PORT || 3000;

// database name
const databaseName = "wikiDB";
// example : mongodb://127.0.0.1:27017/wikiDB
const uriDB = (process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/")+databaseName;

// ========================== set up ================
// creating express app
const app = express()
// using EJS
app.set('view engine', 'ejs');
// using body parser in the object app
app.use(bodyParser.urlencoded({extended: true}));
// serving static files
// now we can refer to static files with a relative path
app.use(express.static("public"));

// ====================== mongoDB configuration ========
// creating the connection to MongoDB Database
const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(uriDB);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// creating schemat for the wikiDB database - for article
const articleSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: [true, 'the title of a article is required.']
      },
    content: {
        type: String,
        required: [true, 'the content of a article is required.']
      },
});

// creating the collection in MongoDB
const Article = mongoose.model("Article", articleSchema);


// ========================= routes =====================
// ======================= ALL ARTICLES ========================================
// chaining routes
// all routes for /articles (GET, POST, DELETE)
app.route('/articles')
    // GET request - getting all articles
    // example: /articles
    .get((req, res) => {
        // getting all the articles from the database
        Article.find((error, foundArticles) => {
            // if no error sending back all the articles to the user
            if (!error){
                res.status(200).send(foundArticles);
            } else {
                res.status(400).send(error);
            }
        });
    })
    // POST request - creating a new article
    // example: /articles
    .post((req, res) => {
        // creating the new article
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        // saving the new article to the database
        newArticle.save((error) => {
            // if no error sending back all the articles to the user
            if (!error){
                res.status(200).send("Success - article added to the database!");
            } else {
                res.status(400).send(error);
            }
        });
    })
    // DELETE request - deleting all the articles
    // example: /articles
    .delete((req, res) => {
        // deletes all the articles
        // by not defining first parameter all elements are selected for deletion!
        Article.deleteMany( (error) => {
            if (!error){
                res.status(200).send("Success - all article were deleted from the database!");
            } else {
                res.status(400).send(error);
            }
        });
    });


// ======================= SPECIFIC ARTICLE ====================================
// all routes for /articles/specific-article (GET, PUT, PATCH, DELETE)
app.route("/articles/:articleTitle")
    // GET request - getting specific article - 
    // example: /articles/james-bond - here searching by title James Bond
    .get((req, res) => {
        // finding element by title
        Article.findOne({title: req.params.articleTitle}, (error, foundArticle) => {
            if (!error) {
                if (foundArticle) {
                    // sending it if found
                    res.status(200).send(foundArticle);
                } else {
                    res.status(404).send("Articel with the given title dosent exists!");
                }
            } else {
                res.status(400).send(error);
            }
        });
    })
    // PUT request - updating the whole article
    // example: /articles/james-bond  - and params title="new_title", content="new_content"
    .put((req,res) => {
        // first find the element
        // and then replace the value with the given parameters
        // it will update the whole article, so if you dont specify all parameters they will
        // be erased from the document
        Article.replaceOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            (error,  result) => {
                if (!error){
                    // Number of documents modified
                    if (result.modifiedCount){
                        // sending confirmation
                        res.status(200).send("Success - The article was updated in the database!");
                    } else {
                        res.status(404).send("Articel with the given title dosent exists!");
                    }
                }else {
                    res.status(400).send(error);
                }
            } 
          );
    })
    // PATHCH request - updating just part of the article, like updating only title or the content
    // example: /articles/james-bond  - and params title="new_title", content="new_content"
    .patch((req,res) => {
        // first find the element
        // and then update the value with the given parameters
        // it will update only specify parameter and not modify the rest in the document
        Article.updateMany(
            {title: req.params.articleTitle},
            {$set: req.body},
            (error,  result) => {
                if (!error){
                    // Number of documents modified
                    if (result.modifiedCount){
                        // sending confirmation
                        res.status(200).send("Success - The article was updated in the database!");
                    } else {
                        res.status(404).send("Articel with the given title dosent exists!");
                    }
                }else {
                    res.status(400).send(error);
                }
            } 
        );
    })
    // DELETE request - deletes just the given article for the specified title
    // example: /articles/james-bond  - just this article will get deleted
    .delete((req,res) => {
        // find elemenet and delete it
        Article.deleteOne(
            {title: req.params.articleTitle}, 
            (error, result) => {
                if (!error){
                    // Number of documents deleted
                    if (result.deletedCount){
                        // sending confirmation
                        res.status(200).send("Success - The article was deleted from the database!");
                    } else {
                        res.status(404).send("Articel with the given title dosent exists!");
                    }
                } else {
                    res.status(400).send(error);
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