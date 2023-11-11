const asyncHandler = require('express-async-handler');
const { errorMiddlewareHandler } = require('./errorMiddlewareHandler');
const Student = require('../models/student');
const jwt = require('jsonwebtoken');

const authMiddleware =  asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const student = await Student.findById(decoded.id);
            req.student = student;
        } catch(error){
            res.status(401);
            throw new Error('Not authorized, token invalid');
        }
    }
});

module.exports = authMiddleware;