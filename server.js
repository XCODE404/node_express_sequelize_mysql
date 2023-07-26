const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const useragent = require('express-useragent');

require('dotenv').config({
    path: path.resolve(__dirname, `.env.${ process.env.NODE_ENV }`),
});

const app = express();

var corsOptions = { origin: "http://localhost:8081" };

// parse requests of content-type - application/json
app.use(express.json());
// Cross origin
app.use(cors(corsOptions));
// Get client device info
app.use(useragent.express());
// adding morgan to log HTTP requests
app.use(morgan('combined'));
// adding Helmet to enhance your Rest API's security
app.use(helmet());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Put public folder to static
app.use(express.static(path.join(__dirname, 'public')));



// set port, listen for requests
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`We are running at port ${ port }`));

