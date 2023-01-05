# Mastering Web Development with Express.js
This is a repository of projects to understand how to use Node.js and Express.js in order to create websites and web applications.
Each project will be more complex and will show how Express.js can be used on the backend side.

## 01_BMI_calculator
This is a BMI calculator, a web application built with Express.js.
The whole functionality of the calculator is processed on the server side.
This is a great starting project for an introduction to Express.js and web site development.

## 02_WeatherProject_API
This is an API-driven web application that was built with Express.js. The user will send a form with the name of a city to check the weather.
Next, the data will be retrieved by the server, and the server will make a request to the API (https://openweathermap.org/api) to get the relevant information. If the location exists, the server will render information regarding the temperature and an icon depicting the weather. If the location does not exist, the server will display an appropriate message to the user. 
In order for the program to work, you need to register at https://openweathermap.org/api for a free account and create your own API key that you will have to use in this program.  
 
## 03_Newsletter_SignUp_WEB_APP
Website is live at: https://arturos-newsletter.cyclic.app/.</br>
This is a newsletter web application where you can email people who are interested in your product. It is a single page, and the frontend was developed with HTML, CSS, and Bootstrap 5. The main page will have a submit form containing the username and email address. The backend side was developed using Express.js and the Mailchimp Marketing API (https://mailchimp.com/developer/), which is used to store and manage the email subscription list. This newsletter web app will allow people to sign up for your mailing list. After submitting the form, the data will be sent to the server, which will make a post request to the Mailchimp Marketing API with the intention of saving the data there. If successful, the user will be redirected to a successful website, and if this process fails, the user will be redirected to a failure website with an option to go back and submit the data again. The whole process is integrated with MailChimp, which gives us the option of managing our subscription email lists. This is a perfect example of how to use Express.js with APIs, and post data to communicate with the server.</br>
Deployed to https://www.cyclic.sh/.   

## 04_ToDo_List_WEB_APP
This is a to-do list web app with two routes. One route (/) will show the current date and month, and the other will be for work (/work). You can add items to each of the lists and mark them as checked (which will cross them out). This is a great way to follow up on your task and never forget what you have to do again! This web app was developed using Node.js, Express.js, EJS, CSS, HTML, and JavaScript. It's also a great example of how to use templating and parse variables into a ejs files, as well as how to create and use your own modules with Express.js.  

## 05_Blog_Website
This is a blog website with a minimalistic design. It has a header with a navbar with a brand, and in the bootom, it has a sticky footer. The middle part consists of the actual content of the blog and will include the snippets (up to 100 characters long) of posts, and each of the posts will have a "read more" link that can redirect the user to the post detail view with the full text where you can read them independently. Posts will be listed in chronological order. The blog website consists of the home page, about page, and contact page, which can be accessed from the navbar, as well as a hidden route '/compose' that is used for creating posts. Everything is generated using EJS partials. The website is fully mobile-responsive. It was developed with Node.js and Express.js on the backend and CSS and Bootstrap 5.3 on the frontend.

# 06_ToDo_List_WEB_APP_MongoDB_Mongoose
This project continues from where the 04_ToDo_List_WEB_APP left off. This is a to-do list web app with dynamically created routes, and the data from the list is stored in a NoSQL database - MongoDB and managed with the use of mongoose-js. There are two main routes, the first one is the main route (/) which shows the title "Todo" with three example tasks; the other route is (/about) with an example description.
On top of that, whenever the user chooses to access any different routes like "/work", "/school", "/education" etc - by accessing them for the first time, the server will take the name of the route and create from it a collection in the MongoDB database. This is an example of how dynamic routing with parameters works in Express-js. The data is stored in MongoDB, so it will not get lost after resetting the server. The user can delete elements from any list by checking them, this will create a post request that will be processed in the "/delete" route, and the given element will be erased from the database. The users can also add elements to any list by simply typing the task name and hitting the plus sign. This will be processed on the backend, and the right collection will get updated in MongoDB. This web app was developed using Node.js, Express.js, MongoDB, Mongoose, EJS, CSS, HTML, and JavaScript.  