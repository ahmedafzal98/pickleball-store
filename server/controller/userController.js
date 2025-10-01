const Joi = require("joi");
const User = require("../models/UserModel");
const ReferalCode = require("../models/ReferralCodesModel");
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

    const affiliateLink = `https://pickleball-store-backend.onrender.com/u/${referralCode}`;

    res.json({ message: "User added successfully", affiliateLink });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error while creating user",
      error: err.message,
    });
  }
};

const redirectUser = async (req, res) => {
  try {
    const { id } = req.params;

    res.cookie("affiliateId", id, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173");
  } catch (error) {
    res.status(500).json({
      message: "Server error while getting user",
      error: error.message,
    });
  }
};

module.exports = { addUser, redirectUser };
