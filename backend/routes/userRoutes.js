const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a new user (POST)
router.post("/register", async (req, res) => {
  const { id, name, email, password, userLevel } = req.body;

  try {
    const newUser = new User({
      id,
      name,
      email,
      password,
      userLevel, // Only include userLevel in the new user creation
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating user", details: error.message });
  }
});

// Get all users (GET)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching users", details: error.message });
  }
});

// Get a single user by email (GET)
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: error.message });
  }
});
// Login a user (POST)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (consider using bcrypt for hashing in production)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Return relevant user information along with userLevel
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userLevel: user.userLevel, // Include userLevel in the response
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a user by email (PUT)
router.put("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Get the fields to update from the request body
    const updateFields = {};

    // Only add fields to updateFields if they exist in the request body
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.password) updateFields.password = req.body.password; // If applicable
    if (req.body.phone) updateFields.phone = req.body.phone;
    if (req.body.QrCode) updateFields.QrCode = req.body.QrCode; // If applicable
    if (req.body.gender) updateFields.gender = req.body.gender; // Optional field
    if (req.body.dateOfBirth) updateFields.dateOfBirth = req.body.dateOfBirth; // Optional field
    if (req.body.profilePicture)
      updateFields.profilePicture = req.body.profilePicture;
    if (req.body.height) updateFields.height = req.body.height; // New field
    if (req.body.weight) updateFields.weight = req.body.weight; // New field

    // Update the user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        ...updateFields,
        updatedAt: Date.now(),
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating user", details: error.message });
  }
});

// Delete a user by email (DELETE)
router.delete("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting user", details: error.message });
  }
});

module.exports = router;
