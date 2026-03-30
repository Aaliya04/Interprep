// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // connect to MongoDB (make sure MongoDB is running locally)
// mongoose.connect("mongodb://localhost:27017/authDemo")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// // User schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String
// });

// const User = mongoose.model("User", userSchema);

// // Signup route
// app.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     res.status(201).send("✅ User registered successfully!");
//   } catch (err) {
//     res.status(400).send("❌ Error: " + err.message);
//   }
// });

// // Login route
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).send("❌ User not found!");

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).send("❌ Invalid password!");

//     // res.send("✅ Login successful!");

//     res.json({
//   success: true,
//   user: { email }
// });
//   } catch (err) {
//     res.status(500).send("❌ Server error");
//   }
// });

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));

console.log("🔥 NEW SERVER RUNNING");



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/authDemo")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema
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

// ================= SERVER =================
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
