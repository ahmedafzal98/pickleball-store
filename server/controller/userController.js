const Joi = require("joi");
const User = require("../models/UserModel");
const { validateUser } = require("../validators/userValidators");

const addUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ errors: error.details });

  try {
    const { referralCode } = await User.create(req.body);

    if (!referralCode)
      return res
        .status(400)
        .json({ message: "Issue while creating affiliate Link" });

    const affiliateLink = `http://wesellpickleball.xyz/u/${referralCode}`;

    res.json({ message: "User added successfully", affiliateLink });
  } catch (err) {
    res.status(500).json({
      message: "Server error while creating user",
      error: err.message,
    });
  }
};

const redirectUser = async (req, res) => {
  try {
    const user = await User.findOne({ referralCode: req.params.id });

    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.redirect("http://wesellpickleball.xyz");
  } catch (error) {
    res.status(500).json({
      message: "Server error while getting user",
      error: err.message,
    });
  }
};

module.exports = { addUser, redirectUser };
