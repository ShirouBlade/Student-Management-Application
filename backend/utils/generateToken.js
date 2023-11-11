const jwt = require('jsonwebtoken');

const generateToken = (studentId) => {
    return jwt.sign({id: studentId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;