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