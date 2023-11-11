const mongoose = require('mongoose');

const dbConnect = () => {
    //Connect DB

    mongoose.connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(()=>console.log('db connected')).catch(err => console.log(err));

};

module.exports = dbConnect;