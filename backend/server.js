require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const interviewRoutes = require("./routes/interview");
const emotionRoutes = require("./routes/emotion");

const app = express();

// ✅ FIX 1: CORS FIRST (VERY IMPORTANT)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ FIX 2: JSON parser
app.use(express.json());

// ✅ ROUTES AFTER CORS
app.use("/api/interview", interviewRoutes);
app.use("/api/emotion", emotionRoutes);


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


// ================= CHATBOT =================
app.post("/api/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();

  let reply = "Try asking about motivation, plans, or improvement 📚";

  if (msg.includes("motivate")) {
    reply = "You are stronger than you think 💪";
  }

  setTimeout(() => {
    res.json({ reply });
  }, 500);
});


// ================= SERVER =================
app.listen(5000, () => console.log("🚀 Server running on port 5000"));