const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Create new user
const createUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
  // Validate input
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      id: uuidv4(),
      email,
      firstName,
      lastName,
      password: hashedPassword,
      account_created: new Date(),
      account_updated: new Date(),
    };

    const newUser = await User.create(userData);

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      account_created: newUser.account_created,
      account_updated: newUser.account_updated,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get user info
const getUser = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    account_created: user.account_created,
    account_updated: user.account_updated
  });
};

// Update user info
const updateUser = async (req, res) => {
    const { firstName, lastName, password } = req.body;
    const userId = req.user.id;
  
    // Define allowed fields and check for invalid fields in the request body
    const allowedFields = ['firstName', 'lastName', 'password'];
    const invalidFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));
  
    // If there are invalid fields, return a 400 Bad Request response
    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: `Cannot update fields: ${invalidFields.join(', ')}`,
      });
    }
  
    try {
      const user = await User.findByPk(userId);
  
      // Update allowed fields only
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      // Update account_updated timestamp
      user.account_updated = new Date();
      await user.save();
  
      res.status(200).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        account_updated: user.account_updated,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
  

module.exports = {
  createUser,
  getUser,
  updateUser
};
