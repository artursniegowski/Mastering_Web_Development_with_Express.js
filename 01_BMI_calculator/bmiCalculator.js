const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// usin body parser in the object
app.use(bodyParser.urlencoded({extended: true}));
// definign the port for our app
const port = 3000;

// home route: '/' - GET
app.get('/', (req, res) => {
  res.sendFile( __dirname + "/index.html");
});

// route: /bmiCalculator - GET
app.get('/bmiCalculator', (req, res) => {
  res.sendFile( __dirname + "/bmiCalculator.html");
});

// route: /bmiCalculator - POST
app.post('/bmiCalculator', (req, res) => {

  // body parser allows us to use the body -
  // easy way of accesing the form data
  let weight = Number(req.body.weight);
  let height = Number(req.body.height);

  let bmiValue = Math.round( weight / Math.pow(height/100,2)*100)/100;
  
  res.send(`Your BMI is '${bmiValue}'.`)
});

app.listen(port, () => {
  console.log(`Calculator app listening on port ${port}`);
});