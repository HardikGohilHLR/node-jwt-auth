// Database Connection
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    connectToDb: (callback) => {
        mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => callback(true))
        .catch(error => {
            console.log('Database Connection Error', error);
            return callback(false);
        })
    },
}
