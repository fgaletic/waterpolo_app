import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(400).send('Registration failed');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(400).send('Login failed');
  }
});

export default router;
