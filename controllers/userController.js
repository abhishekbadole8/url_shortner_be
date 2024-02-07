const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register a new user
// @route POST api/user/register
// @access public
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check all fields are fill
    if (!email || !password) {
      return res.status(400).json({ error: "all field's are mandatory" });
    }

    //check user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

// @desc Login a user
// @route POST api/user/login
// @access public route
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check all fields are filled
    if (!email || !password) {
      return res.status(400).json({ error: "all field's are mandatory" });
    }

    //check user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Email/password is invalid" });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = { registerUser, loginUser };
