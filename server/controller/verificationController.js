const crypto = require("crypto");
const { verificationToken, endpointUrl } = require("../config/ebayConfig");

const verifyEbayChallenge = (req, res) => {
  const challengeCode = req.query.challenge_code;
  if (!challengeCode) return res.status(400).send("Missing challenge_code");
  if (!verificationToken)
    return res.status(400).send("Missing verification token");
  if (!endpointUrl) return res.status(400).send("Missing endpoint URL");

  const hash = crypto.createHash("sha256");
  hash.update(challengeCode);
  hash.update(verificationToken);
  hash.update(endpointUrl);
  const challengeResponse = hash.digest("hex");

  res.status(200).json({ challengeResponse });
};

const handleEbayDeletion = (req, res) => {
  // TODO: Process deletion if needed
  res.status(200).send("Received");
};

module.exports = { verifyEbayChallenge, handleEbayDeletion };
