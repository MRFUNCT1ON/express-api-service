// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

// defining the Express app
const app = express();

app.use(helmet());          // adding Helmet to enhance your API's security
app.use(bodyParser.json()); // using bodyParser to parse JSON bodies into JS objects
app.use(cors());            // enabling CORS for all requests

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send('Express API activated');
});

app.get('/sendMessage', (req, res) => {
    // get arguments from request
    var service = req.query.service;
    var message = req.query.message;

    if (service == "telegram") {

    } else if (service == "discord") {

    } else if (service == "all") {
        
    }

    res.send('Message sent');
});

// starting the server
app.listen(3000, () => {
  console.log('listening on port 3001');
});