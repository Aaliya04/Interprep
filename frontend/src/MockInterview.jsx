import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function MockInterview() {
  const [role, setRole] = useState("Frontend Developer");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [emotion, setEmotion] = useState("");
  const [stressLevel, setStressLevel] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Interview flow
  const [started, setStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [scores, setScores] = useState([]);
  const [interviewDone, setInterviewDone] = useState(false);
  const [reportData, setReportData] = useState([]);

  const webcamRef = useRef(null);

  // 🎙️ Voice
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

 
  const getStressLevel = (emotionValue) => {
    const value = emotionValue?.trim().toLowerCase();

    if (["angry", "fear", "sad", "disgust"].includes(value)) return "High Stress";
    if (["neutral", "surprise"].includes(value)) return "Medium Stress";
    if (["happy"].includes(value)) return "Low Stress";
    return "Low Stress"; // fallback
  };

  
  const getQuestion = async () => {
    try {
      setLoadingQuestion(true);

      const res = await axios.post("http://localhost:5000/api/interview/question", {
        role,
      });

      const q = res.data.question || "No question generated.";

      setQuestion(q);
      setFeedback("");
      setAnswer("");
      setEmotion("");
      setStressLevel("");

      speak(q);

    } catch (error) {
      console.error(error);
      setQuestion("Failed to fetch question.");
    } finally {
      setLoadingQuestion(false);
    }
  };
  const startInterview = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch {
      alert("Camera & Mic permission required!");
      return;
    }

    setStarted(true);
    setQuestionCount(1);
    await getQuestion();
  };

  const captureEmotion = async () => {
  try {
    if (!webcamRef.current) return {};

  const imageSrc = webcamRef.current.getScreenshot();

if (!imageSrc || imageSrc.length < 100) {
  console.log("❌ Invalid frame");
  return { emotion: "No Face", stress: "Low Stress" };
}

    const res = await axios.post("http://localhost:5000/api/emotion", {
      image: imageSrc,
    });

    const detectedEmotion = (res.data.emotion || "").trim();
    const stress = getStressLevel(detectedEmotion);

    setEmotion(detectedEmotion);
    setStressLevel(stress);

    return { emotion: detectedEmotion, stress };

  } catch (error) {
    console.error("Emotion error:", error);
    return { emotion: "Unknown", stress: "Low Stress" };
  }
};

 const submitAnswer = async () => {
  try {
    if (!answer.trim()) {
      alert("Please type or speak your answer first.");
      return;
    }

    console.log("Submitting answer..."); // ✅ FIX 2

    setSubmitting(true);

    const res = await axios.post("http://localhost:5000/api/interview/evaluate", {
      answer,
    });

    const result = res.data.feedback || "No feedback received.";
    setFeedback(result);

    console.log("Feedback:", result); // ✅ FIX 2

    const match = result.match(/\d+/);
    const score = match ? parseInt(match[0]) : 5;

    setScores((prev) => [...prev, score]);

const detected = await captureEmotion() || {
  emotion: "neutral",
  stress: "Low Stress",
};

setReportData((prev) => [
  ...prev,
  {
    question,
    answer,
    emotion: detected?.emotion || "neutral",
    stress: detected?.stress || "Low Stress",
    feedback: result,
    score,
  },
]);

  } catch (error) {
    console.error(error);
  } finally {
    setSubmitting(false);
  }
};
  // 🎤 Voice Input
  const startVoiceInput = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      alert("Mic permission denied!");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Google Chrome");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    setIsListening(true);

    let finalText = "";
    recognition.start();

    recognition.onresult = (event) => {
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += text + " ";
        } else {
          interim += text;
        }
      }

      setAnswer(finalText + interim);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    setTimeout(() => recognition.stop(), 6000);
  };

  const getFinalScore = () => {
    if (!scores.length) return 0;
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  };

  useEffect(() => {
    if (started) getQuestion();
  }, [started]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">

        {!started && (
          <div className="text-center mb-4">
            <button
              onClick={startInterview}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              🚀 Start Interview
            </button>
          </div>
        )}

        {started && !interviewDone && (
          <p className="text-center mb-4">
            Question {questionCount} / 5
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
             className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>AIML Engineer</option>
            </select>

            <div  className="w-full px-4 py-12 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400">
              {loadingQuestion ? "Loading..." : question}
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={getQuestion}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Next Question
              </button>

              <button
                onClick={startVoiceInput}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                🎤 Speak
              </button>
            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              onClick={submitAnswer}
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-xl"
            >
              {submitting ? "Submitting..." : "Submit Answer"}
            </button>
          </div>

          {/* RIGHT */}
          <div>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" 
            videoConstraints={{
    width: 640,
    height: 480,
    facingMode: "user"
  }}
            
            className="mb-4" />

            <div className="text-gray-800 font-semibold">
              <p>{feedback || "Submit to get feedback"}</p>
            </div>

            <div className="flex gap-4">
              <div className="bg-blue-100 p-4 rounded-xl w-1/2">
                <p>Emotion</p>
                <h3>{emotion || "Not detected"}</h3>
              </div>

              <div className="bg-red-100 p-4 rounded-xl w-1/2">
                <p>Stress</p>
                <h3>{stressLevel || "Analyzing..."}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL REPORT */}
        {interviewDone && (
          <div className="mt-6 bg-green-100 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-center mb-4">
              🎉 Interview Completed
            </h2>

            <p className="text-center mb-4">
              ⭐ Average Score: {getFinalScore()} / 10
            </p>

            {reportData.map((item, i) => (
              <div key={i} className="bg-white p-4 mb-3 rounded-xl shadow">
                <p><strong>Q{i + 1}:</strong> {item.question}</p>
                <p><strong>Answer:</strong> {item.answer}</p>
                <p><strong>Emotion:</strong> {item.emotion}</p>
                <p><strong>Stress:</strong> {item.stress}</p>
                <p><strong>Score:</strong> {item.score}/10</p>
                <p className="text-blue-600">💡 {item.feedback}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}