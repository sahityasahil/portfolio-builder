const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// User Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Portfolio Model
const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  personalInfo: {
    name: String,
    title: String,
    bio: String,
    contact: String,
    socialLinks: [{ platform: String, url: String }]
  },
  sections: [{
    type: { type: String },
    title: String,
    content: mongoose.Schema.Types.Mixed
  }],
  theme: {
    template: String,
    colors: {
      primary: String,
      secondary: String,
      background: String
    },
    font: String
  }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Routes

// User Registration
app.post('/api/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// User Login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials email' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        email
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create/Update Portfolio
app.post('/api/portfolio', authMiddleware, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (portfolio) {
      // Update existing portfolio
      portfolio = await Portfolio.findOneAndUpdate(
        { user: req.user.id },
        { $set: req.body },
        { new: true }
      );
    } else {
      // Create new portfolio
      portfolio = new Portfolio({
        user: req.user.id,
        ...req.body
      });
      await portfolio.save();
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get Portfolio
app.get('/api/portfolio', authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete Portfolio
app.delete('/api/portfolio', authMiddleware, async (req, res) => {
  try {
    await Portfolio.findOneAndRemove({ user: req.user.id });
    res.json({ message: 'Portfolio deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


app.get("/",(req,res)=>
{
  res.send("hi, welcome to website");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));