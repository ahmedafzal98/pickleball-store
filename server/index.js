const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

const VERIFICATION_TOKEN = "e3201657169c22ff56df27ff881ee04d";
// Replace with your chosen token

const allowedOrigins = [
  "https://pickleball-store-frontend.onrender.com",
  "http://localhost:5173",
];
const ENDPOINT_URL =
  "https://pickleball-store-backend.onrender.com/ebay-deletion";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// GET endpoint for verification
app.get("/ebay-deletion", (req, res) => {
  const challengeCode = req.query.challenge_code;
  if (!challengeCode) {
    return res.status(400).send("Missing challenge_code query parameter.");
  }

  // Compute the hash: SHA256(challengeCode + verificationToken + endpoint URL)
  const hash = crypto.createHash("sha256");
  hash.update(challengeCode);
  hash.update(VERIFICATION_TOKEN);
  hash.update(ENDPOINT_URL);
  const challengeResponse = hash.digest("hex");

  // Respond with the challengeResponse in JSON format
  res.status(200).json({ challengeResponse });
});

// POST endpoint to handle deletion notifications
app.post("/ebay-deletion", (req, res) => {
  console.log("Received eBay Account Deletion Notification:", req.body);
  // Process deletion notification here if needed
  res.status(200).send("Received");
});

app.get("/api/ebay", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.ebay.com/buy/browse/v1/item_summary/search",
      {
        params: { q: "pickleball" },
        headers: {
          Authorization:
            "Bearer v^1.1#i^1#f^0#I^3#p^1#r^0#t^H4sIAAAAAAAA/+VYbWwURRju9dqShpZaBDQNP45FmkC9vf24vdvb3B25UqBXem3hri1FlOztzrYL+3Hdmeu1TYi1KMQQ+RBiimCs/NH6gTHR+BlMJCKgUTFoaoj1I6goBIxIiIak7l6Pcq0EkF5iE+/PZd55553neeZ9Z2aH6CsqXrK1duuVUtuM/ME+oi/fZiNnEsVFhVWz7PkVhXlEloNtsO++voJ++1k/5FUlwa0BMKFrEDi6VUWDXNoYwJKGxuk8lCGn8SqAHBK4aChSz1E4wSUMHemCrmCOcE0AkzwE7xUoH2AA4ZYAa1q1azFjegDziqzA+GiWB4AUPDRt9kOYBGENIl5DAYwiKMZJ0E6SiJEsx3g4yov7GO86zNECDCjrmumCE1gwDZdLjzWysN4cKg8hMJAZBAuGQyuijaFwzfKGmN+VFSuY0SGKeJSEE1vLdBE4WnglCW4+DUx7c9GkIAAIMVdwbIaJQbnQNTB3AD8ttYcmSGBOwVKMKSVD5UTKFbqh8ujmOCyLLDqltCsHNCSjnlspaqoR3wgElGk1mCHCNQ7rb3WSV2RJBkYAW14dags1NWHBUIcKxJDU64wBiJxNa2qckggEkiJp3ilKbh/rFqXMJGORMhJPmmWZromyJRh0NOioGpiIwWRd3Fm6mE6NWqMRkpCFJsuPIsb1I9dZCzq2gknUoVlrClRTBEe6eWv1x0cjZMjxJALjESZ3pOUJYHwiIYvY5M50HmZSpxsGsA6EEpzLlUql8BSN60a7iyII0rU2Uh8VOoDKYxlfq9a7oXzrAU45TUUA5kgoc6gnYWLpNvPUBKC1Y0GGZD20L6P7RFjBydZ/GLI4uyZWQ66qg5HirJsVJOCl4oyXJXNRHcFMgrosHCDO9zhV3tgEUELhBeAUzDxLqsCQRY5mJIpmJeAUPT7J6fZJkjPOiB4nKQFAABCPCz72/1Ikt5vmUSAYAOUsz3OS41XVtdUtdcv53i7QiXpJTzzSpkU9hlC/tnNVlIJSV1sr0yR11qhuPXC7lXBD8ssU2VQmZs6fSwGsWp+6CLU6RECcEr2ooCdAk67IQs/0WmDaEJt4A/VEgaKYhimRDCUS4dzt0zmh9y+2iDvjnNuz6T84l27IClrpOr1YWeOhGYBPyLh18uCCrrp03rxyWKYNULBq3UQ9Jd6yeVudVqxNkmNsZXHsmomnKeOwS8ANAPWkYd6w8Ubr5hXTNwHNPMuQoSsKMFrIKdeyqiYRH1fAdCvqHCS4zE+zg5b0ukkPTflY75R4CeljdMN025JyuQ1bhgLvbV6lXRM/6oN56R/Zb/uA6LcdzrfZCD+xiFxILCiyNxfYSyqgjAAu8xIO5XbN/FY1AL4J9CR42ci/O++zWfXiI7X1l/viyTdb/1jK5pVmvSkMPkjcO/6qUGwnZ2Y9MRDzr/cUkmX3lFIMQZMEyTIeyruOWHi9t4CcVzDnSL6yYFdX9Gd1m/DYu0vU9cPbNpcTpeNONlthXkG/LQ92fD37zxHs15OnZxwech3wD24GR+ZUv0VcPhR5Z3Zs7YqPStSnT3c8D4/X1Z36pauySrHzp574aW6t9kY49Gx5e7hkeOS5T/kz+/ZeGDhbkTr+Rdnc0UsHWqWiqhNP3n9x7+LhFwb2K2dG7to1+t5Jxw+txypPpEYPvnJutHjz8PaHhhL9QX/vys7zNJi345v9zbtXOhw7jN+YyOKXj5IvrbqwteJq76vrG546u6u8zocfeu3Lv/xXR9qbV1V9d/n1k1dWP5qKnNrfvOfFLTuH7G2VH5ZtGSh5YPfSc48/s9A7dKn/4MVvy7dvPF/28Nsrvyc+ObZo/oAa+WpPvPNj/44fa3Fy387f7Z8ffb9rbC3/Bl4p2MjtEQAA",
          Accept: "application/json",
        },
      }
    );
    console.log(response.data);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Listen on the appropriate port (Render provides the PORT env variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
