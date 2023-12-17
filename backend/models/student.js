const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

StudentSchema.pre('save', async function(next){

    const salt = await bcrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
});
//Verify Password
StudentSchema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};



const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;