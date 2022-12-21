# 02_WeatherProject_API

This is an API-driven web application that was built with Express.js. The user will send a form with the name of a city to check the weather.
Next, the data will be retrieved by the server, and the server will make a request to the API (https://openweathermap.org/api) to get the relevant information. If the location exists, the server will render information regarding the temperature and an icon depicting the weather. If the location does not exist, the server will display an appropriate message to the user. 
In order for the program to work, you need to register at https://openweathermap.org/api for a free account and create your own API key that you will have to use in this program.  

---  

Useful Links:

API openweather</br>
https://openweathermap.org/current</br>

Express.js</br>
https://expressjs.com/</br>

Node.js</br>
https://nodejs.org/en/docs/</br>

body-parser from Node.js</br>
https://www.npmjs.com/package/body-parser</br>

GET-requests</br>
https://nodejs.org/dist/latest-v18.x/docs/api/https.html#httpsgeturl-options-callback</br>

dotenv</br>
https://www.npmjs.com/package/dotenv</br>

nodemon</br>
https://www.npmjs.com/package/nodemon</br>

---

**Example views from the website:**</br>
</br>


![Screenshot](docs/img/01_img.png)</br>


![Screenshot](docs/img/02_img.png)</br>


![Screenshot](docs/img/03_img.png)</br>



---

**The program was developed using Node.js, Express.js, JavaScript, HTML**

---


Steps required to run the server/web application:</br>
1. Use 'npm install' command to install the dependencies from package.json.</br>
2. Change the name of .env.example to .env.</br>
3. Before using the program, you will have to create a free account on https://openweathermap.org/api and define the environmental variable in .env:</br>
**OPEN_WEATHER_MAP_API_KEY**="your_API_KEY".</br>
4. Start the server file app.js with the command **node app.js** or **nodemon app.js** if you wish to enable automatic server reloading after detecting file changes.</br>
5. Open your web browser and navigate to localhost:3000, where the website will be live.</br>
