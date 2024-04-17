const User = require('../models/users'); 

exports.createUser = async (req, res) => {
    const { name, surname, email, dateOfBirth, occupation, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = new User({ name, surname, email, dateOfBirth, occupation, password });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
