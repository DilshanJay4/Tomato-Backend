const Question = require('../models/questionModel');
const mongoose = require('mongoose');
const axios = require('axios');

// get Question
const getQuestion = async (req, res) => {
//   const user_id = req.user._id;

  try {
    // Fetch question from the API
    const response = await axios.get('https://marcconrad.com/uob/tomato/api.php?out=json');
    const { question, solution } = response.data;

    // Save the question to your database
    const newQuestion = new Question({
        question,
        solution
    });

    await newQuestion.save();

    res.json(newQuestion);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
}

}

module.exports = {getQuestion};










// create new workout
// const createWorkout = async (req, res) => {
//   const {title, load, reps} = req.body

//   let emptyFields = []

//   if(!title) {
//     emptyFields.push('title')
//   }
//   if(!load) {
//     emptyFields.push('load')
//   }
//   if(!reps) {
//     emptyFields.push('reps')
//   }
//   if(emptyFields.length > 0) {
//     return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
//   }

//   // add doc to db
//   try {
//     const user_id = req.user._id
//     const workout = await Workout.create({title, load, reps, user_id})
//     res.status(200).json(workout)
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// }

// // delete a workout
// const deleteWorkout = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such workout'})
//   }

//   const workout = await Workout.findOneAndDelete({_id: id})

//   if (!workout) {
//     return res.status(400).json({error: 'No such workout'})
//   }

//   res.status(200).json(workout)
// }

// // update a workout
// const updateWorkout = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such workout'})
//   }

//   const workout = await Workout.findOneAndUpdate({_id: id}, {
//     ...req.body
//   })

//   if (!workout) {
//     return res.status(400).json({error: 'No such workout'})
//   }

//   res.status(200).json(workout)
// }





// // get a single workout
// const getWorkout = async (req, res) => {
//     const { id } = req.params
  
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(404).json({error: 'No such workout'})
//     }
  
//     const workout = await Workout.findById(id)
  
//     if (!workout) {
//       return res.status(404).json({error: 'No such workout'})
//     }
    
//     res.status(200).json(workout)
//   }