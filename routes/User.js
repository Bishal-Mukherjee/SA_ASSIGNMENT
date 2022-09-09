const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @router POST api/auth/register
// @desc create a new user
// @access public
router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (user) {
      res.status(200).json({ message: "USER ALREADY REGISTERED" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hashSync(req.body.password, salt);
      let newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword,
      });
      await newUser.save();
      res.status(200).json({ message: "USER REGISTERED SUCCESSFULLY" });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "USER REGISTERATION ERROR" });
  }
});

// @route POST api/users
// @desc authentication and get token
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("Inavlid Credentials");
    }

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid Password");
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    user.password = undefined;

    const token = jwt.sign(payload, "secret", {
      expiresIn: 7200,
    });
    res.cookie("token", token, { expiresIn: 7200 });
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
