const express = require('express');
const https = require('node:https');
const bodyParser = require('body-parser')
// for loading the env variables
require('dotenv').config();

const app = express();
// usin body parser in the object
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

// variables for accesing the API
const endpointWeatherAPP = "https://api.openweathermap.org/data/2.5/weather";
let params = {
    location: "your location",
    units: "metric",
    API_KEY: process.env.OPEN_WEATHER_MAP_API_KEY,
};


// routes
// home - GET
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// home - POST
app.post('/', (req, res) => {
    
    const cityName = req.body.cityName;
    params.location = cityName

    const urlOpenWeatherMapApi = endpointWeatherAPP + `?q=${params.location}&units=${params.units}&appid=${params.API_KEY}`;
    // console.log(urlOpenWeatherMapApi)
    https.get(urlOpenWeatherMapApi, (response)=> {

        console.log(response.statusCode);
        console.log(response.headers);

        response.on('data', (data) => {

            if (response.statusCode === 200){
                // this will output hex code
                // console.log(data);
                // process.stdout.write(data); - this is smimilar to consol.log but the data will be formated!!
                // this is why stdout dosent show hex code but a readable format!
                // parsing the returned data to JSON format which is easy readable
                // and not like hex code
                const weatherData = JSON.parse(data);
                // this will do the excat oposit - stringify the object
                // JSON.stringify(weatherData)

                // console.log(weatherData);
                // console.log("blabla")

                const temp = weatherData.main.temp ?? 'None';
                const feelLikeTemp = weatherData.main.feels_like ?? 'None';
                const weatherDescription = weatherData.weather[0].description ?? 'None';
                const weatherIcon = weatherData.weather[0].icon ?? 'None';
                
                // we can have only one res.send() so this is why we use res.write()!
                res.write(`<h1>The temperature in ${cityName} is ${temp} degrees Celcius.</h1>`);
                res.write(`<p>The weather is currently ${weatherDescription} and feels like ${feelLikeTemp} degrees Celcius.</p>`)
                res.write(`<img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="weather-icon">`)
            } else {
                res.write(`<h1>Cant find the location: '${cityName}'.</h1>`)
            }


            res.send()
        });
    }).on('error', (error)=>{
        console.log(error)
    });
});



// default message that server is running
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});