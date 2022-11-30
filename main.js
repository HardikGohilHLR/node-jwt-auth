// Main
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectToDb } = require('./db');

const AuthRouter = require('./routes/auth-router');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

connectToDb((connected) => {
    if(connected) {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }
});

// Auth Routes
app.use('/auth', AuthRouter);
