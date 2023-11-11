const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Event = require('../models/event');

const eventRouter = express.Router();

//Create Event

eventRouter.post('/', expressAsyncHandler(async(req, res)=>{
    const event = await Event.create(req.body);

    if(event){
        res.status(200);
        res.json(event);
    }else{
        res.status(500);
        throw new Error('Event Creation Failed');
    }

}));
eventRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const event = await Event.find({});

    if(event){
        res.status(200);
        res.json(event);
    }else{
        res.status(500);
        throw new Error('There are no Events');
    }

}));

eventRouter.put('/:id', authMiddleware,expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if(event){
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200);
        res.json(updatedEvent);
    } else{
        res.status(500);
        throw new Error('Update Failed');
    }
}));

module.exports = eventRouter;