/** @format */
const express = require('express');
const dotenv = require('dotenv');
const studentsRoute = require('./routes/studentsRoute');
const eventsRoute = require('./routes/eventsRoute');
const professorsRoute = require('./routes/professorsRoute');
const coursesRoute = require('./routes/coursesRoute');
const error = require('./middlewares/errorMiddlewareHandler');
dotenv.config();
require('./config/dbConnect')();
const cors = require('cors');

app.use(cors());

const app = express();

//Passing body data
app.use(express.json());

//Routes
app.use('/api/students', studentsRoute);
app.use('/api/events', eventsRoute);
app.use('/api/professors', professorsRoute);
app.use('/api/courses', coursesRoute);

console.log(process.env.JWT_SECRET_KEY);
//Error Middleware
app.use(error.errorMiddlewareHandler);
//Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running ${PORT}`);
});
