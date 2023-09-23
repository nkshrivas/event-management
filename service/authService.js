const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Role = require('../models/Role');
async function register(req, res) {
  // Validate request body using express-validator or other validation middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists by email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Find the role by name in the database
    const roleDocument = await Role.findOne({ name: role });

    // Create a new user with the specified role
    user = new User({ name, email, password, roles: [roleDocument._id] });

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Generate and return a JWT token for the newly registered user
    const token = generateToken(user);
    return res.status(201).json({ token, role: role }); // Return role name
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Find the user's role by ID in the database
    const userRole = await Role.findById(user.roles[0]); // Assuming a user has only one role

    // Generate and return a JWT token for the logged-in user with their role
    const token = generateToken(user, userRole.name); // Pass role name as an argument
    return res.json({ token, role: userRole.name ,user:user}); // Return role name
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
function generateToken(user, roleName) {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: roleName, // Include the role name in the payload
    },
  };

  // Sign the token with a secret key and set an expiration
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
  register,
  login,
};
