var bodyParser = require('body-parser');
var express = require('express');
// for loading the env variables
require('dotenv').config();
const mailchimp = require('@mailchimp/mailchimp_marketing');
const { json } = require('body-parser');


// port on which the server will listen
// localhost:port
const port = process.env.PORT || 3000;

const app = express()
// using body parser in the object (app)
app.use(bodyParser.urlencoded({extended: true}));

// serving static files
// now we can refer to static files with a relative path
app.use(express.static("static"));


// MAILCHIMP
// configuring the mailchimp
mailchimp.setConfig({
    apiKey: process.env.apiKeyMailchimp,
    server: process.env.serverMailchimp,
});

// adding a member to the list to mailchimp
// list_id also called Audience ID
// members An array of objects as desc in 
// https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/
const run = async (list_id, members_list) => {
  const response = await mailchimp.lists.batchListMembers(list_id, {
    members: members_list,
  })
//   .then( (response) => {
//         console.log(response)
//     })

};


// routes
// home - get
app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/signup.html");
});

// home - post
app.post("/", (req, res) => {
    // getting the data from the post request
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // creating empty array for chimpmail
    let list_of_members = [];

    list_of_members.push({
        email_address: email,
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        status: "subscribed",
    });

    run( process.env.listIDMailchimp, list_of_members)
    .then( () => {
        // if successful render sucess page
        res.sendFile(__dirname+"/success.html");
    })
    .catch((error) => { // if an error reneder failed page
        // console.log(error)
        res.sendFile(__dirname+"/failure.html");
    })
});

// failure - post
app.post("/failure", (req, res) => {
    // redirects home - back to form
    res.redirect("/")
})

// general message from the server - to know that is running
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});