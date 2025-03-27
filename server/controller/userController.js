const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id);
    res.status(200).json({ token, msg: "User Logged In Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    const token = generateToken(user._id);

    res.status(200).json({ token, msg: "User Signup Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
