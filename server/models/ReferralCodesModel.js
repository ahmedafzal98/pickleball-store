const mongoose = require("mongoose");

const referalCodeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ReferalCode = mongoose.model("ReferalCode", referalCodeSchema);
module.exports = ReferalCode;
