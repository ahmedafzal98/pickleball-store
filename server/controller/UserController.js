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
    console.log(id);

    res.cookie("affiliateId", id, {
      httpOnly: true,
      secure: true, // required in HTTPS (Render uses HTTPS)
      sameSite: "none", // required for cross-site cookies
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.redirect("http://localhost:5173");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error while getting user",
      error: error.message,
    });
  }
};

const getAffiliate = (req, res) => {
  try {
    const affiliateId = req.cookies.affiliateId || null;

    res.status(200).json({
      success: true,
      affiliateId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching affiliate ID",
      error: error.message,
    });
  }
};

const clearAffiliate = (req, res) => {
  res.clearCookie("affiliateId", {
    httpOnly: true,
    secure: true, // if you used it before
    sameSite: "None", // if you used it before
  });
  res.json({ success: true, message: "Affiliate cookie cleared" });
};

module.exports = { addUser, redirectUser, getAffiliate, clearAffiliate };
