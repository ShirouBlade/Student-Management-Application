const express = require('express');
const asyncHandler = require('express-async-handler');
const Student = require('../models/student');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middlewares/authMiddleware');
const studentsRoute = express.Router();

//User Routes

//Register
studentsRoute.post('/register', asyncHandler(async(req, res) =>{
    const {name, email, password} = req.body;
    const studentExists = await Student.findOne({email: email});
    if(userExists){
        throw new Error('Student Exists already');
    }
    const studentCreated = await Student.create({name, email, password});
    res.send(userCreated);
    //set status code
    res.status(200);
    res.json({
        _id: studentCreated._id,
        name: studentCreated.name,
        password: studentCreated.password,
        email: studentCreated.password,
        token: generateToken(student._id),
    });
}));
//Login
studentsRoute.post('/login', asyncHandler(async(req, res) =>{
    const {email, password} = req.body;

    const student = await Student.findOne({email});

    if(student && (await student.isPasswordMatch(password))){
        //set status code
        res.status(200);
        res.json({
            _id: student._id,
            name: student.name,
            password: student.password,
            email: student.password,
            token: generateToken(student._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
}));

//Update User
studentsRoute.put('/update', authMiddleware, (req, res) =>{
    res.send('Update Route');
});

//Fetch Users
studentsRoute.get('/', authMiddleware, (req, res)=>{
    console.log(req.headers);
    res.send('Fetch students');
});

//Delete User
studentsRoute.delete('/:id', (req, res) => {
    res.send('Delete Route');
});
module.exports = studentsRoute;
