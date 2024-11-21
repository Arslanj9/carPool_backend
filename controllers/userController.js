const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Register User
const registerUser = async (req, res) => {
  const { 
    name, 
    userRole,
    password, 
    profilePic, 
    contactInfo, 
    rating = 0, 
    reviews = 0, 
    about, 
    currentRole,
    designation,    
    department,     
    workCity,
    vehicles = []        
  } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the provided data
    const user = new User({
      name,
      userRole,
      password: hashedPassword,
      profilePic,
      contactInfo,
      rating,
      reviews,
      about,
      currentRole,
      designation,    
      department,     
      workCity,       
      vehicles 
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with the token
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




// Login User
const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find the user by name
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with the token
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




const getUserById = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Controller function to get vehicles for a user
const getUserVehicles = async (req, res) => {
  const { userId } = req.body; // Retrieve userId from request body

  try {
    const user = await User.findById(userId).select('vehicles');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.vehicles); // Send only the vehicles array
  } catch (err) {
    console.error("Error fetching user's vehicles:", err);
    res.status(500).json({ message: 'Server error' });
  }
};





// Controller function to get vehicle details by vehicleId
const getVehicleDetails = async (req, res) => {
  const { vehicleId } = req.body; // Retrieve vehicleId from request body

  try {
    const user = await User.findOne({ "vehicles._id": vehicleId }, { "vehicles.$": 1 }); // Find the user with the vehicle
    if (!user || user.vehicles.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(user.vehicles[0]); // Send the specific vehicle details
  } catch (err) {
    console.error("Error fetching vehicle details:", err);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { registerUser, loginUser, getUserById, getUserVehicles, getVehicleDetails };
