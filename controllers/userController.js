const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '5d' })
}


// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, img } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password, img);

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Increment user's score
const updateUserScore = async (req, res) => {
  const userId = req.user._id;
  const { score } = req.body;


  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.score = parseInt(score);
    await user.save();

    res.status(200).json({ message: 'Score updated successfully', score: user.score });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getUserInfo = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      throw new Error('User not found');
    }

    // Send user information with additional fields (if applicable)
    res.status(200).json({
      email: user.email,
      score: user.score,
      firstName: user.firstName,
      lastName: user.lastName,
      img: user.img, // Include image URL if stored
      // Add other relevant user information fields
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all users information
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from response

    // Check if any users found
    if (!users.length) {
      return res.status(200).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { signupUser, loginUser, updateUserScore, getUserInfo, getAllUsers }