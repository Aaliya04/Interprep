const express = require("express");
const router = express.Router();
const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;

// 🎯 Generate Question
router.post("/question", async (req, res) => {
  const { role } = req.body;

  try {
   const response = await axios.post(
  "https://api-inference.huggingface.co/models/google/flan-t5-base",
  {
   inputs: `You are an interviewer. Ask a UNIQUE and DIFFERENT interview question for a ${role} candidate. Do not repeat previous questions.`,
  },
  {
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);
    console.log("HF RESPONSE:", response.data);

   if (!response.data || response.data.error) {
  console.log("HF Error:", response.data);

  return res.json({
    question: "⏳ AI model is loading... please try again",
  });
}

    const question = response.data?.[0]?.generated_text;

    res.json({
      question: question || "Tell me about yourself.",
    });

  } catch (err) {
    console.log("❌ ERROR:", err.response?.data || err.message);

    res.json({
      question: "What is React and how does it work?",
    });
  }
});

// 🎯 Evaluate Answer + Score

// router.post("/evaluate", async (req, res) => {
//   try {
//     const { answer } = req.body;
//     console.log("🔥 EVALUATE API HIT");

//     console.log("ANSWER:", answer);

//     // ✅ Prevent crash if empty
//     if (!answer || answer.trim() === "") {
//       return res.json({
//         feedback: "Please enter an answer first",
//       });
//     }

//     // ✅ SHORT prompt (important)
//     const prompt = `Evaluate this interview answer and give short feedback with score out of 10: ${answer}`;

//     let feedback = "Good attempt. Score: 5/10";

//     try {
//       const response = await axios.post(
//         "https://api-inference.huggingface.co/models/google/flan-t5-small",
//         {
//           inputs: prompt,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.HF_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//           timeout: 10000, // ⬅️ reduce timeout
//         }
//       );

//       console.log("HF RESPONSE:", response.data);

//       if (Array.isArray(response.data)) {
//         feedback = response.data[0]?.generated_text || feedback;
//       } else if (response.data?.error) {
//         console.log("HF ERROR:", response.data.error);
//         feedback = "⏳ AI is loading... try again";
//       }

//     } catch (apiError) {
//       console.log("HF FAILED:", apiError.message);
//       // fallback continues
//     }

//     // ✅ ALWAYS send response (prevents 500)
//     return res.json({ feedback });

//   } catch (err) {
//     console.log("❌ SERVER CRASH:", err.message);

//     return res.json({
//       feedback: "Something went wrong. Try again.",
//     });
//   }
// });

router.post("/evaluate", async (req, res) => {
  try {
    const { answer } = req.body;

    console.log("🔥 EVALUATE API HIT");
    console.log("ANSWER:", answer);

    if (!answer || answer.trim() === "") {
      return res.json({
        feedback: "Please enter an answer first",
      });
    }

    let feedback = "Good attempt. Score: 5/10";

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/google/flan-t5-small",
        {
          inputs: `Evaluate this interview answer and give short feedback with score out of 10: ${answer}`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("HF RESPONSE:", response.data);

      if (Array.isArray(response.data)) {
        feedback = response.data[0]?.generated_text || feedback;
      } else if (response.data?.error) {
        console.log("HF ERROR:", response.data.error);
        feedback = "⏳ AI is loading... try again";
      }

    } catch (apiError) {
      console.log("HF FAILED:", apiError.message);
      feedback = "AI unavailable. Score: 6/10";
    }

    return res.json({ feedback });

  } catch (err) {
    console.log("❌ SERVER ERROR:", err.message);

    return res.json({
      feedback: "Something went wrong. Try again.",
    });
  }
});
module.exports = router;