const axios = require("axios");

const CATEGORY_API = "https://pickleball-admin.onrender.com/api/categories";

// Simple in-memory session for now (replace with Redis or DB for production)
const session = {};

/**
 * Normalize text: lowercase, remove extra spaces and special chars
 */
const normalize = (text) =>
  text
    ?.toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim() || "";

/**
 * Chatbot reply controller
 */
exports.chatbotReply = async (req, res) => {
  try {
    const userId = req.ip; // Simple session per user
    const message = normalize(req.body.message);

    if (!message) {
      return res.json({ reply: "Please type something 🙂" });
    }

    if (!session[userId]) session[userId] = {};

    // Fetch all categories
    const { data: categories } = await axios.get(CATEGORY_API);

    // ---------------- GREETING ----------------
    const greetings = ["hi", "hello", "hey"];
    if (greetings.some((w) => message.includes(w))) {
      return res.json({
        reply: "Hello 👋! I can help you explore categories and products.",
      });
    }

    // ---------------- SHOW MAIN CATEGORIES ----------------
    if (["category", "categories", "show"].some((w) => message.includes(w))) {
      const mainCategories = categories.filter((c) => c.parent === null);

      session[userId] = {}; // reset context

      return res.json({
        reply:
          "Here are our main categories:\n" +
          mainCategories.map((c) => `• ${c.name}`).join("\n") +
          "\n\nType a category name to explore subcategories or products.",
      });
    }

    // ---------------- MATCH CATEGORY ----------------
    const matchedCategory = categories.find((c) =>
      normalize(c.name).includes(message)
    );

    if (matchedCategory) {
      const children = categories.filter(
        (c) => c.parent === matchedCategory.id
      );
      session[userId].lastCategory = matchedCategory;

      if (children.length > 0) {
        // Category has subcategories
        return res.json({
          reply:
            `Subcategories of ${matchedCategory.name}:\n` +
            children.map((c) => `• ${c.name}`).join("\n") +
            "\n\nType a subcategory name to view products.",
        });
      }

      // Leaf category → suggest products
      return res.json({
        reply: `Great choice! Fetching products for "${matchedCategory.name}" 🛒`,
        leafCategory: matchedCategory,
      });
    }

    // ---------------- FALLBACK ----------------
    return res.json({
      reply:
        "Sorry 😕 I didn't understand that. You can try:\n" +
        "• show categories\n" +
        "• paddles\n" +
        "• beginner products",
    });
  } catch (err) {
    console.error("CHATBOT ERROR:", err);
    return res.status(500).json({
      reply: "Oops! Something went wrong on our side. Please try again later.",
    });
  }
};
