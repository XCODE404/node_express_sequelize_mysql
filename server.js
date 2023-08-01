// Import the required modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const useragent = require('express-useragent');
const errors = require('./app/utils/errors');

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

// Register the router under a specific base path
app.use('/api/employee', require('./app/routes/employee.routes'));
app.use('/api/role', require('./app/routes/mst_role.routes'));
app.use('/api/customer', require('./app/routes/customer.routes'));
app.use('/api/category', require('./app/routes/category.routes'));
app.use('/api/sub_category', require('./app/routes/sub_category.routes'));
app.use('/api/product', require('./app/routes/product.routes'));
app.use('/api/order', require('./app/routes/order.routes'));
app.use('/api/order_detail', require('./app/routes/order_detail.routes'));

// catch all errors and format and report
errors(app);

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`We are running at port ${ PORT }`));

