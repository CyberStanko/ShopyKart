const express = require('express');
const userData = require('../schema/UserSchema');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = "user";

    if (name && email && password) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

      // Save user with hashed password
      const user = new userData({ name, email, password: hashedPassword, role });
      await user.save();

      res.status(200).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "Invalid data" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userData.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(user);

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful", userId: user._id, role: user.role });


    // Success
    // res.status(200).json({ message: "Login successful", userId: user._id});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;