const express = require('express');
const asyncHandler = require('express-async-handler');
const Professor = require('../models/professor');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middlewares/authMiddleware');
const professorsRoute = express.Router();

//User Routes

//Register
professorsRoute.post('/register', asyncHandler(async(req, res) =>{
    const {firstName, lastName, email, password} = req.body;
    const professorExists = await Professor.findOne({email: email});
    if(userExists){
        throw new Error('professor Exists already');
    }
    const professorCreated = await Professor.create({firstName, lastName, email, password});
    res.send(userCreated);
    //set status code
    res.status(200);
    res.json({
        _id: professorCreated._id,
        firstName: professorCreated.firstName,
        lastName: professorCreated.lastName,
        password: professorCreated.password,
        email: professorCreated.password,
        token: generateToken(professor._id),
    });
}));
//Login
professorsRoute.post('/login', asyncHandler(async(req, res) =>{
    const {email, password} = req.body;

    const professor = await Professor.findOne({email});

    if(professor && (await professor.isPasswordMatch(password))){
        //set status code
        res.status(200);
        res.json({
            _id: professor._id,
            firstName: professor.firstName,
            lastName: professor.lastName,
            password: professor.password,
            email: professor.password,
            token: generateToken(professor._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
}));

//Update User
professorsRoute.put('/update', authMiddleware, asyncHandler( async (req, res) => {
    const professor = await Professor.findById(req.professor._id);
    if(professor){
        professor.firstName = req.body.firstName || professor.firstName;
        professor.lastName = req.body.lastName || professor.lastName;
        professor.email = req.body.email || professor.email;
        if(req.body.password){
            professor.password = req.body.password || professor.password;
        }

        const updatedProfessor = await professor.save();

        res.json({
            _id: updatedProfessor._id,
            firstName: updatedProfessor.firstName,
            lastName: updatedProfessor.lastName,
            email: updatedProfessor.email,
            token: generateToken(updatedProfessor._id),
        });
    }
}));

//Fetch Users
professorsRoute.get('/', asyncHandler(async(req, res)=>{
    const professor = await Professor.findById(req.professor._id);

    if(professor){
        res.status(200);
        res.json(professor);
    }else{
        res.status(500);
        throw new Error('There is no professor with that id');
    }

}));

//Delete User
professorsRoute.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const professor = await Professor.findByIdAndDelete(req.params.id);

        res.status(200);
        res.send(professor);
    } catch (error) {
        res.json(error);
    }
}));
module.exports = professorsRoute;
