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
  // Process deletion notification here if needed
  res.status(200).send("Received");
});

app.get("/api/ebay", async (req, res) => {
  try {
    const query = req.query.q || "";
    const finalQuery = query ? `pickleball ${query}` : `pickleball`;

    const response = await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search`,
      {
        params: { q: finalQuery, limit: 50, offset: 0 },
        headers: {
          Authorization:
            "Bearer v^1.1#i^1#I^3#f^0#p^1#r^0#t^H4sIAAAAAAAA/+VYW2wUVRjutl0MYLmEglyTZWqDAWd2rnsZuqtb2qYrvcGuhYK1zOUMO3RunXO27dZEShPwwUSiGCUhhKYKNCY+QCKQID6QqPFJQxTQxJQHNFYTH6AGE2N0ZrqUbSWAdBObuC+b85///Of7vvP/55w55OC8+RsPNR66U+F7onR4kBws9fmoheT8ef5Ni8pKV/tLyAIH3/Dg04PlQ2U/1UBB1yx+O4CWaUAQ6Nc1A/KeMYZlbYM3BahC3hB0AHkk8alEcxNPEyRv2SYyJVPDAsm6GCZFqUg4HGKFMANYhlYcq3E3ZtqMYQpLUrIAODlES6QYpZ1+CLMgaUAkGCiG0STN4SSDU3SaivIcw3MswYXoXVigHdhQNQ3HhSCxuAeX98baBVgfDFWAENjICYLFk4mGVGsiWVffkq4JFsSK53VIIQFl4fTWFlMGgXZBy4IHTwM9bz6VlSQAIRaMT84wPSifuAvmMeB7UgNWkcWIzAAOiJIUVooiZYNp6wJ6MA7Xosq44rnywEAqyj1MUUcNcR+QUL7V4oRI1gXcv21ZQVMVFdgxrL420ZFoa8PiiYwO5IQygKcBRHjb9jpckYFE0RQj4LLCRiOsrOQnmYyUl3jGLFtMQ1ZdwWCgxUS1wEEMZurCFujiOLUarXZCQS6aAj+auqsfF97lLujkCmZRxnDXFOiOCAGv+XD1p0YjZKtiFoGpCDM7PHlimGBZqozN7PTyMJ86/TCGZRCy+GCwr6+P6GMI094bpEmSCu5sbkpJGaALWN7XrfV+qD58AK56VCTgjIQqj3KWg6XfyVMHgLEXi3NUJMRE87pPhxWfaf2HoYBzcHo1FKs6GIokwwzFKkCQARktRnHE8/kZdGEAUcjhumB3A2RpggRwyUmzrA5sVeYZTqGZiAJwORRVcDaqKLjo7Hg4pQBAAiCKUjTyf6mRR83yFJBsgIqW5kVJ8U21jbXtL9QLA72gBw1QIbG5w0iFbKlpZ8/WFA2V3o4dXJvSU6ezZuxRC+G+5LdoqqNM2pm/qAK4tT5rERpNiIA8K3opybRAm6mpUm5uLTBjy22CjXIpoGmOYVYkE5aVLN42XRR6/2KLeDzOxT2a/oNj6b6soJuuc4uVOx46AQRLJdyTh5BMPWgKzo3DNXU5iN1at8CseKvOZXVOsXZITrJV5clbJuFRJmCvRNgAmlnbuWATre7FK212A8M5y5Btahqw26lZ17KuZ5EgamCuFXURElwV5thBS4VZKkJGaYadFS/JO0a75tqWVMxt2DOUhx7tJh2c/k0fL/F+1JDvMjnk+6TU5yNryGqqilw/r+zF8rInV0MVAUIVFAKqew3nU9UGRDfIWYJqly4r+XJRk3ygsem3QTF7fsfEc5GSioInheFOcuXUo8L8MmphwQsDufZej59a/FQFzZGMwz7KMRy7i6y611tOrSivTN72T/xyVuwcfXkcrc+8UbOtYfM6smLKyefzl5QP+Ure3jBSu+7iq0n2d+7wR9K+Y1czr4+f2X+Jvjb2Uvz98+2nRF1ree07ZcNYxZVq/9LmI1VXRpecrPLbqbFr6ZHlX9ypFDdcvbDwq1Cp/0TntgPfHz724/KLXXV8dXD39cpS/PKyUXzVwKLdzK/7e/ePdU4883Hj7TVvCH+FutfZ712oOlKvrjoYGmn5tPKV3PNdO7/GTl5qiR8037mZGn+2f3S1tGDJHuvDZmot3qidO7H8259X3qqs7719Zli+euto9Vvg2KXNyRtv2teV65lvjo+cnoCg8t0/kovToz98sHTFjcDWc4v1Bc1Hx3puNqwxT3UkP9vz50q+c/TsRrjkxpnjnyunz94ZPz65ln8DPjsHtOwRAAA=",
          Accept: "application/json",
        },
      }
    );

    const totalItems = response.data.itemSummaries?.length || 0;

    const adjustedLimit = totalItems < 50 ? totalItems : 50;

    res.json({
      totalItems,
      limitUsed: adjustedLimit,
      items: response.data.itemSummaries || [],
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// app.post("/api/auth", async (req, res) => {
//   axios.post("https://api.ebay.com/identity/v1/oauth2/token", {});
// });

// Listen on the appropriate port (Render provides the PORT env variable)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
