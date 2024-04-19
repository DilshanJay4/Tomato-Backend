require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/question');

// express app
const app = express();

// CORS middleware
app.use(cors());

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/game', questionRoutes);

// Set strictQuery option to false
mongoose.set('strictQuery', false);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database Connection Successfull !!');
  })
  .catch((error) => {
    console.log(error);
  })


// listen for requests
app.listen(process.env.PORT, () => {
  console.log('Server listening on port', process.env.PORT);
});