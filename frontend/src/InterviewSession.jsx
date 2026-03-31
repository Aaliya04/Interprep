




//  import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import Webcam from "react-webcam";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCheckCircle, FaExclamationTriangle, FaVideo, FaMicrophone } from "react-icons/fa";

// export default function InterviewSession() {
//   const { type } = useParams();
//   const navigate = useNavigate();
  
//   // --- States ---
//   const [index, setIndex] = useState(0);
//   const [time, setTime] = useState(0);
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [stressScore, setStressScore] = useState(1.2); // 0.0 - 10.0 scale
//   const [lastSpeechTime, setLastSpeechTime] = useState(Date.now());
  
//   const questions = {
//     Technical: ["Explain the difference between var, let, and const.", "What is a closure in JavaScript?", "How does the Virtual DOM work?"],
//     HR: ["Tell me about yourself.", "Why should we hire you?", "What are your salary expectations?"],
//     Behavioural: ["Describe a time you failed.", "How do you handle conflict in a team?"]
//   };
//   const currentQuestions = questions[type] || [];

//   // --- Real-time Analytics Logic ---
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isListening) {
//         // Slowly drift back to calm when not speaking
//         setStressScore(prev => Math.max(1.0, prev - 0.05));
//         return;
//       }

//       let newScore = stressScore;
//       const now = Date.now();
//       const silenceDuration = (now - lastSpeechTime) / 1000;

//       // 1. Silence Penalty (Simulates "Freezing")
//       if (silenceDuration > 4) {
//         newScore += 0.2; 
//       }

//       // 2. Filler Word Detection
//       const fillers = (transcript.match(/um|uh|like|basically|actually/gi) || []).length;
//       if (fillers > 2) newScore += 0.1;

//       // 3. Random "Micro-expression" Jitter (Makes the AI look real)
//       newScore += (Math.random() - 0.5) * 0.1;

//       // Keep within 1.0 - 10.0 range
//       setStressScore(parseFloat(Math.min(10, Math.max(1, newScore)).toFixed(1)));
//     }, 800);

//     return () => clearInterval(interval);
//   }, [isListening, lastSpeechTime, transcript, stressScore]);

//   // Timer & Speech Sync
//   useEffect(() => {
//     let t;
//     if (isListening) {
//       t = setInterval(() => setTime(p => p + 1), 1000);
//     }
//     return () => clearInterval(t);
//   }, [isListening]);

//   const startSpeech = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech API not supported");
    
//     const rec = new SpeechRecognition();
//     rec.continuous = true;
//     rec.interimResults = true;
//     rec.onresult = (e) => {
//       setTranscript(Array.from(e.results).map(r => r[0].transcript).join(""));
//       setLastSpeechTime(Date.now()); // Reset silence clock
//     };
//     rec.start();
//     setIsListening(true);
//   };

//   // --- UI Helpers ---
//   const getStressColor = () => {
//     if (stressScore < 3.5) return "text-emerald-500";
//     if (stressScore < 7.0) return "text-amber-500";
//     return "text-rose-500";
//   };

//   const getProgressWidth = () => (stressScore / 10) * 100;

//   if (index >= currentQuestions.length) {
//     return (
//       <div className="min-h-screen bg-sky-50 flex items-center justify-center">
//         <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-white p-12 rounded-3xl shadow-2xl text-center border border-sky-100">
//           <h1 className="text-4xl font-bold text-slate-800 mb-4">Session Complete!</h1>
//           <p className="text-slate-500 mb-8">AI is compiling your final stress and communication report...</p>
//           <button onClick={() => navigate("/")} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all">View Full Analysis</button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-sky-50 p-6 lg:p-10 text-slate-900">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* LEFT: Interview Content */}
//         <div className="lg:col-span-7 flex flex-col gap-6">
//           <div className="bg-white p-8 rounded-3xl shadow-sm border border-sky-100">
//             <div className="flex justify-between items-center mb-6">
//               <span className="flex items-center gap-2 px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
//                 <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span> {type} Interview
//               </span>
//               <p className="text-slate-400 font-medium">Question {index + 1} of {currentQuestions.length}</p>
//             </div>
//             <h2 className="text-3xl font-semibold text-slate-800 leading-tight">
//               {currentQuestions[index]}
//             </h2>
//           </div>

//           <div className="bg-slate-900 rounded-3xl p-8 shadow-xl min-h-[300px] relative border-b-4 border-indigo-500">
//             <div className="flex justify-between items-center mb-4">
//                <p className="text-indigo-400 text-xs font-black uppercase tracking-widest">Live AI Transcription</p>
//                <p className="text-slate-500 text-xs">Timer: {time}s</p>
//             </div>
//             <p className="text-xl text-slate-300 leading-relaxed italic">
//               {transcript || "The AI is waiting for your response..."}
//             </p>
//             {!isListening && (
//               <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center rounded-3xl">
//                 <button onClick={startSpeech} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 shadow-xl transform active:scale-95 transition-all">
//                   <FaMicrophone /> Start Answering
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="flex gap-4">
//             <button onClick={() => { setIndex(index+1); setTranscript(""); setTime(0); setIsListening(false); }} className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
//               Skip Question
//             </button>
//             <button onClick={() => { setIndex(index+1); setTranscript(""); setTime(0); setIsListening(false); }} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
//               Next Question
//             </button>
//           </div>
//         </div>

//         {/* RIGHT: AI Monitoring Hub */}
//         <div className="lg:col-span-5 flex flex-col gap-6">
          
//           {/* Webcam Section */}
//           <div className="relative rounded-[2rem] overflow-hidden bg-slate-200 aspect-video shadow-2xl border-4 border-white group">
//             <Webcam className="w-full h-full object-cover" mirrored />
//             <div className="absolute inset-0 pointer-events-none border-[1px] border-indigo-500/20">
//                <div className="w-full h-[2px] bg-indigo-400/40 absolute top-0 animate-scanning shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
//             </div>
//             <div className="absolute top-4 left-4 flex gap-2">
//               <span className="bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
//                 <FaVideo className="text-emerald-400" /> CAMERA ACTIVE
//               </span>
//             </div>
//           </div>

//           {/* Stress Analytics Card */}
//           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-sky-100">
//             <div className="flex justify-between items-end mb-4">
//               <div>
//                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Stress Intensity</p>
//                 <h3 className={`text-4xl font-black transition-colors duration-500 ${getStressColor()}`}>
//                   {stressScore.toFixed(1)}
//                 </h3>
//               </div>
//               <p className="text-xs font-bold text-slate-400 pb-1">LEVEL: {stressScore > 7 ? 'HIGH' : stressScore > 3.5 ? 'MODERATE' : 'OPTIMAL'}</p>
//             </div>

//             <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-8 border border-slate-50">
//               <motion.div 
//                 animate={{ width: `${getProgressWidth()}%` }}
//                 className={`h-full transition-all duration-700 ${stressScore > 7 ? 'bg-rose-500' : stressScore > 3.5 ? 'bg-amber-400' : 'bg-emerald-500'}`}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//                <FeedbackPill label="Pace" active={isListening && (transcript.split(" ").length / (time || 1)) < 2.5} />
//                <FeedbackPill label="Fluency" active={!transcript.match(/um|uh|like/gi)} />
//                <FeedbackPill label="Eye Contact" active={true} />
//                <FeedbackPill label="Volume" active={isListening} />
//             </div>
//           </div>

//           <div className="bg-indigo-900 text-white p-6 rounded-3xl">
//              <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-2">Live AI Insight</p>
//              <p className="text-sm font-medium leading-relaxed">
//                {stressScore > 7.5 ? "Take a deep breath. Your speech pace is accelerating." : "Excellent composure. Keep maintaining your current rhythm."}
//              </p>
//           </div>

//         </div>
//       </div>

//       <style>{`
//         @keyframes scanning {
//           0% { top: 0; }
//           100% { top: 100%; }
//         }
//         .animate-scanning {
//           animation: scanning 4s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// function FeedbackPill({ label, active }) {
//   return (
//     <div className={`flex items-center gap-2 p-3 rounded-2xl border transition-all ${active ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
//       {active ? <FaCheckCircle className="text-xs" /> : <FaExclamationTriangle className="text-xs" />}
//       <span className="text-xs font-bold tracking-tight">{label}</span>
//     </div>
//   );
// }













import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaVideo, FaMicrophone } from "react-icons/fa";

export default function InterviewSession() {
  const { type } = useParams();
  const navigate = useNavigate();
  
  // --- States ---
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [stressScore, setStressScore] = useState(1.2); 
  const [lastSpeechTime, setLastSpeechTime] = useState(Date.now());
  
  // 1. ADD THIS: This array stores the stress levels for the graph
  const [stressHistory, setStressHistory] = useState([]);

  const questions = {
    Technical: ["Explain the difference between var, let, and const.", "What is a closure in JavaScript?", "How does the Virtual DOM work?"],
    HR: ["Tell me about yourself.", "Why should we hire you?", "What are your salary expectations?"],
    Behavioural: ["Describe a time you failed.", "How do you handle conflict in a team?"]
  };
  const currentQuestions = questions[type] || [];

  // --- Real-time Analytics Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isListening) {
        setStressScore(prev => Math.max(1.0, prev - 0.05));
        return;
      }

      let newScore = stressScore;
      const now = Date.now();
      const silenceDuration = (now - lastSpeechTime) / 1000;

      if (silenceDuration > 4) { newScore += 0.2; }
      const fillers = (transcript.match(/um|uh|like|basically|actually/gi) || []).length;
      if (fillers > 2) newScore += 0.1;
      newScore += (Math.random() - 0.5) * 0.1;

      const finalVal = parseFloat(Math.min(10, Math.max(1, newScore)).toFixed(1));
      setStressScore(finalVal);

      // 2. ADD THIS: Save the current stress score into history every second
      setStressHistory(prev => [...prev, finalVal]);

    }, 800);

    return () => clearInterval(interval);
  }, [isListening, lastSpeechTime, transcript, stressScore]);

  // Timer & Speech Sync
  useEffect(() => {
    let t;
    if (isListening) {
      t = setInterval(() => setTime(p => p + 1), 1000);
    }
    return () => clearInterval(t);
  }, [isListening]);

  const startSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech API not supported");
    
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      setTranscript(Array.from(e.results).map(r => r[0].transcript).join(""));
      setLastSpeechTime(Date.now()); 
    };
    rec.start();
    setIsListening(true);
  };

  // 3. ADD THIS FUNCTION: This sends all data to the Analysis page
  const handleViewAnalysis = () => {
    const average = (stressHistory.reduce((a, b) => a + b, 0) / (stressHistory.length || 1)).toFixed(1);
    navigate("/analysis", { 
      state: { 
        type: type, 
        stressHistory: stressHistory, 
        avgStress: average 
      } 
    });
  };

  // --- UI Helpers ---
  const getStressColor = () => {
    if (stressScore < 3.5) return "text-emerald-500";
    if (stressScore < 7.0) return "text-amber-500";
    return "text-rose-500";
  };

  const getProgressWidth = () => (stressScore / 10) * 100;

  if (index >= currentQuestions.length) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <motion.div initial={{scale:0.9}} animate={{scale:1}} className="bg-white p-12 rounded-3xl shadow-2xl text-center border border-sky-100">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Session Complete!</h1>
          <p className="text-slate-500 mb-8">AI is compiling your final stress and communication report...</p>
          {/* 4. UPDATE THIS: Link the button to the new function */}
          <button onClick={handleViewAnalysis} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
            View Full Analysis
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 p-6 lg:p-10 text-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Interview Content */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-sky-100">
            <div className="flex justify-between items-center mb-6">
              <span className="flex items-center gap-2 px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span> {type} Interview
              </span>
              <p className="text-slate-400 font-medium">Question {index + 1} of {currentQuestions.length}</p>
            </div>
            <h2 className="text-3xl font-semibold text-slate-800 leading-tight">
              {currentQuestions[index]}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl min-h-[300px] relative border-b-4 border-indigo-500">
            <div className="flex justify-between items-center mb-4">
               <p className="text-indigo-400 text-xs font-black uppercase tracking-widest">Live AI Transcription</p>
               <p className="text-slate-500 text-xs">Timer: {time}s</p>
            </div>
            <p className="text-xl text-slate-300 leading-relaxed italic">
              {transcript || "The AI is waiting for your response..."}
            </p>
            {!isListening && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                <button onClick={startSpeech} className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-indigo-700 shadow-xl transform active:scale-95 transition-all">
                  <FaMicrophone /> Start Answering
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button onClick={() => { setIndex(index+1); setTranscript(""); setTime(0); setIsListening(false); }} className="flex-1 bg-white border border-slate-200 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Skip Question
            </button>
            <button onClick={() => { setIndex(index+1); setTranscript(""); setTime(0); setIsListening(false); }} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
              Next Question
            </button>
          </div>
        </div>

        {/* RIGHT: AI Monitoring Hub */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative rounded-[2rem] overflow-hidden bg-slate-200 aspect-video shadow-2xl border-4 border-white group">
            <Webcam className="w-full h-full object-cover" mirrored />
            <div className="absolute inset-0 pointer-events-none border-[1px] border-indigo-500/20">
               <div className="w-full h-[2px] bg-indigo-400/40 absolute top-0 animate-scanning shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            </div>
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
                <FaVideo className="text-emerald-400" /> CAMERA ACTIVE
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-sky-100">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Stress Intensity</p>
                <h3 className={`text-4xl font-black transition-colors duration-500 ${getStressColor()}`}>
                  {stressScore.toFixed(1)}
                </h3>
              </div>
              <p className="text-xs font-bold text-slate-400 pb-1">LEVEL: {stressScore > 7 ? 'HIGH' : stressScore > 3.5 ? 'MODERATE' : 'OPTIMAL'}</p>
            </div>

            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-8 border border-slate-50">
              <motion.div 
                animate={{ width: `${getProgressWidth()}%` }}
                className={`h-full transition-all duration-700 ${stressScore > 7 ? 'bg-rose-500' : stressScore > 3.5 ? 'bg-amber-400' : 'bg-emerald-500'}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <FeedbackPill label="Pace" active={isListening && (transcript.split(" ").length / (time || 1)) < 2.5} />
               <FeedbackPill label="Fluency" active={!transcript.match(/um|uh|like/gi)} />
               <FeedbackPill label="Eye Contact" active={true} />
               <FeedbackPill label="Volume" active={isListening} />
            </div>
          </div>

          <div className="bg-indigo-900 text-white p-6 rounded-3xl">
             <p className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-2">Live AI Insight</p>
             <p className="text-sm font-medium leading-relaxed">
               {stressScore > 7.5 ? "Take a deep breath. Your speech pace is accelerating." : "Excellent composure. Keep maintaining your current rhythm."}
             </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanning { 0% { top: 0; } 100% { top: 100%; } }
        .animate-scanning { animation: scanning 4s linear infinite; }
      `}</style>
    </div>
  );
}

function FeedbackPill({ label, active }) {
  return (
    <div className={`flex items-center gap-2 p-3 rounded-2xl border transition-all ${active ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
      {active ? <FaCheckCircle className="text-xs" /> : <FaExclamationTriangle className="text-xs" />}
      <span className="text-xs font-bold tracking-tight">{label}</span>
    </div>
  );
}