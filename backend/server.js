


console.log("🔥 NEW SERVER RUNNING");



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const OpenAI = require("openai"); // 👈 ADD THIS

const app = express();
app.use(cors());
app.use(express.json());

// ================= OPENAI SETUP =================


// ================= MongoDB =================
mongoose.connect("mongodb://localhost:27017/authDemo")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ================= SCHEMA =================
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= 🤖 CHATBOT API =================
app.post("/api/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();

  let reply = "";

  // 💪 Motivation
  if (msg.includes("motivate") || msg.includes("sad") || msg.includes("stress")) {
    const quotes = [
      "Believe in yourself 💪 You are stronger than you think!",
      "Success comes from consistency, not luck 🚀",
      "Every expert was once a beginner — keep going!",
      "You are capable of amazing things ✨"
    ];
    reply = quotes[Math.floor(Math.random() * quotes.length)];
  }

  // 📅 Study Plan
  else if (msg.includes("plan") || msg.includes("schedule")) {
    reply =
      "📅 Smart Study Plan:\n\n" +
      "Morning 🌅: Learn concepts (2 hrs)\n" +
      "Afternoon 📘: Practice problems (1.5 hrs)\n" +
      "Evening 🧠: Revision (30 mins)\n" +
      "Night 🌙: Mock test / recap\n\nStay consistent!";
  }

  // 📈 Improve Marks
  else if (msg.includes("score") || msg.includes("marks") || msg.includes("improve")) {
    reply =
      "📈 Score Boost Tips:\n\n" +
      "✔ Revise daily\n" +
      "✔ Practice previous year questions\n" +
      "✔ Focus on weak areas\n" +
      "✔ Time management during exam\n" +
      "✔ Take mock tests regularly";
  }

  // 👋 Greeting
  else if (msg.includes("hi") || msg.includes("hello")) {
    reply = "Hey 👋 I'm your AI study buddy! How can I help you today?";
  }

  // 🧠 Default smart reply
  else {
    reply =
      "I can help you with:\n\n" +
      "💪 Motivation\n📅 Study plans\n📈 Score improvement\n\n" +
      "Try asking: 'motivate me' or 'make a study plan'";
  }

  // ⏳ Simulate AI delay (typing feel)
  setTimeout(() => {
    res.json({ reply });
  }, 800);
});


// ================= SERVER =================
app.listen(5000, () => console.log("🚀 Server running on port 5000"));