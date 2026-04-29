const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* SIGNUP */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.json({
      message: "Signup successful"
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;