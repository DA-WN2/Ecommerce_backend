import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"; // Assuming you have a token generator since Login works!

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 2. Create the new user
  const user = await User.create({
    name,
    email,
    password, // Make sure your User model has a 'pre-save' hook to hash this!
  });

  // 3. If successful, send back the user data AND a token so they are instantly logged in
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(res, user._id), // Adjust this if your generateToken works differently
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
