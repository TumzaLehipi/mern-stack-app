const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Create Express Server...
const app = express();
const port = process.env.PORT || 5000;

//Create a Middleware
//Allows us to pass json
app.use(cors());
app.use(express.json());

const uri  = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
    );


const connection  = mongoose.connection;
connection.once('open', () => {
    console.log('mongooseDB database connection established successfully ')
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Start server 
app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});