const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    startdate: {
        type: Date,
        required: true,
    },
    enddate: {
        type: Date,
        required: true,
    },
    createdBY: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;