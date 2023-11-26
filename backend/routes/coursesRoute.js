const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Course = require('../models/course');
const authMiddleware = require('../middlewares/authMiddleware');

const courseRouter = express.Router();

// Create Course
courseRouter.post('/', authMiddleware, expressAsyncHandler(async (req, res) => {
    const course = await Course.create({
        ...req.body,
        createdBy: req.user._id, // Assuming you have user information stored in req.user
    });

    if (course) {
        res.status(200).json(course);
    } else {
        res.status(500).send('Course Creation Failed');
    }
}));

// Get All Courses
courseRouter.get('/', authMiddleware, expressAsyncHandler(async (req, res) => {
    const courses = await Course.find({}).populate('professor students createdBy');

    if (courses) {
        res.status(200).json(courses);
    } else {
        res.status(500).send('There are no Courses');
    }
}));

// Update Course
courseRouter.put('/:id', authMiddleware, expressAsyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('professor students createdBy');

        res.status(200).json(updatedCourse);
    } else {
        res.status(500).send('Update Failed');
    }
}));

// Delete Course
courseRouter.delete('/:id', authMiddleware, expressAsyncHandler(async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        res.status(200).json(course);
    } catch (error) {
        res.json(error);
    }
}));

module.exports = courseRouter;
