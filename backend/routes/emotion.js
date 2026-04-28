const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/", (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "No image received" });
  }

  const python = spawn("python", ["emotion.py"]);

  // send base64 to python
  python.stdin.write(image);
  python.stdin.end();

  python.stdout.on("data", (data) => {
    res.json({ emotion: data.toString().trim() });
  });

  python.stderr.on("data", (err) => {
    console.log("Python Error:", err.toString());
  });
});

module.exports = router;