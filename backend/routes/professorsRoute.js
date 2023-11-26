const express = require('express');
const asyncHandler = require('express-async-handler');
const Professor = require('../models/professor');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middlewares/authMiddleware');
const professorsRoute = express.Router();

//User Routes

//Register
professorsRoute.post('/register', asyncHandler(async(req, res) =>{
    const {name, email, password} = req.body;
    const professorExists = await Professor.findOne({email: email});
    if(userExists){
        throw new Error('professor Exists already');
    }
    const professorCreated = await Professor.create({name, email, password});
    res.send(userCreated);
    //set status code
    res.status(200);
    res.json({
        _id: professorCreated._id,
        name: professorCreated.name,
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
            name: professor.name,
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
        professor.name = req.body.name || professor.name;
        professor.email = req.body.email || professor.email;
        if(req.body.password){
            professor.password = req.body.password || professor.password;
        }

        const updatedProfessor = await professor.save();

        res.json({
            _id: updatedProfessor._id,
            name: updatedProfessor.name,
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
        throw new Error('There are no Events');
    }

}));

//Delete User
professorsRoute.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        res.status(200);
        res.send(student);
    } catch (error) {
        res.json(error);
    }
}));
module.exports = professorsRoute;
