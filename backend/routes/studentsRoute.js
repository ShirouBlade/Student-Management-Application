const express = require('express');
const asyncHandler = require('express-async-handler');
const Student = require('../models/student');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middlewares/authMiddleware');
const studentsRoute = express.Router();

//User Routes

//Register
studentsRoute.post('/register', asyncHandler(async(req, res) =>{
    const {firstName, lastName, email, password} = req.body;
    const studentExists = await Student.findOne({email: email});
    if(userExists){
        throw new Error('Student Exists already');
    }
    const studentCreated = await Student.create({firstName, lastName, email, password});
    res.send(userCreated);
    //set status code
    res.status(200);
    res.json({
        _id: studentCreated._id,
        firstName: studentCreated.firstName,
        lastName: studentCreated.lastName,
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
            firstName: student.firstName,
            lastName: student.lastName,
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
studentsRoute.put('/update', authMiddleware, asyncHandler( async (req, res) => {
    const student = await Student.findById(req.student._id);
    if(student){
        student.firstName = req.body.firstName || student.firstName;
        student.lastName = req.body.lastName || student.lastName;
        student.email = req.body.email || student.email;
        if(req.body.password){
            student.password = req.body.password || student.password;
        }

        const updatedStudent = await student.save();

        res.json({
            _id: updatedStudent._id,
            firstName: updatedStudent.firstName,
            lastName: updatedStudent.lastName,
            email: updatedStudent.email,
            token: generateToken(updatedStudent._id),
        });
    }
}));

//Fetch Users
studentsRoute.get('/', asyncHandler(async(req, res)=>{
    const student = await Student.findById(req.student._id);

    if(student){
        res.status(200);
        res.json(student);
    }else{
        res.status(500);
        throw new Error('There are no Events');
    }

}));

//Delete User
studentsRoute.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        res.status(200);
        res.send(student);
    } catch (error) {
        res.json(error);
    }
}));
module.exports = studentsRoute;
