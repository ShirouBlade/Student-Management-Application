/** @format */
const express = require('express');
const dotenv = require('dotenv');
const studentsRoute = require('./routes/studentsRoute');
const error = require('./middlewares/errorMiddlewareHandler');
dotenv.config();
require('./config/dbConnect')();



const app = express();

//Passing body data
app.use(express.json());

//Routes
app.use('/api/students', studentsRoute);

console.log(process.env.JWT_SECRET_KEY);
//Error Middleware
app.use(error.errorMiddlewareHandler);
//Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running ${PORT}`);
});
