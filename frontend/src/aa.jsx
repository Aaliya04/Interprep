import { motion } from "framer-motion";
import { useState } from "react";
import { FaBrain, FaChartLine, FaFileAlt, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  

  const features = [
     { title: "Mock Interviews", desc: "Practice real interview questions." },
    { title: "Aptitude Tests", desc: "Sharpen logical thinking." },
    { title: "Resume Builder", desc: "Create professional resumes." },
    { title: "HR Questions", desc: "Prepare HR rounds." },
    { title: "Technical MCQs", desc: "Test technical skills." },
    { title: "Interview Experience", desc: "Learn from real interviews." },
  ];

  

  return (
    
    <div className="min-h-screen bg-white text-gray-900">

      {/* SIDEBAR */}
      {showSidebar && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6">

            <h2 className="text-xl font-bold mb-6 text-blue-600">
              Menu
            </h2>

            <div className="flex flex-col gap-4 text-gray-700">

              <button onClick={() => navigate("/dashboard")}>
                Dashboard
              </button>

              <button onClick={() => navigate("/interview")}>
                Mock Interview
              </button>

              <button onClick={() => navigate("/test")}>
                Aptitude
              </button>

              <button onClick={() => navigate("/resume")}>
                Resume
              </button>

            </div>

            <button
              onClick={() => setShowSidebar(false)}
              className="mt-10 text-red-500"
            >
              Close
            </button>

          </div>
        </>
      )}

      {/* HERO */}
      <div className="flex flex-col items-center text-center px-6 py-28">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-semibold leading-tight max-w-3xl"
        >
          Prepare for your next{" "}
          <span className="text-indigo-600">interview</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-gray-500 max-w-xl text-lg"
        >
          Learn by solving real interview questions and track your progress.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/interview")}
          className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Start Practicing
        </motion.button>

      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            onClick={() => {
              if (item.title.includes("Mock")) navigate("/interview");
              if (item.title.includes("Resume")) navigate("/resume");
              if (item.title.includes("Aptitude")) navigate("/test");
            }}
            className="p-6 border rounded-xl hover:shadow-md transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold mb-2">
              {item.title}
            </h2>
            <p className="text-gray-500 text-sm">
              {item.desc}
            </p>
          </motion.div>
        ))}

      </div>

      {/* SAMPLE QUESTION */}
      <div className="bg-gray-50 py-24 text-center">

        <h2 className="text-3xl font-semibold mb-4">
          Try a sample question
        </h2>

        <p className="text-gray-500 mb-10">
          Experience how practice works on the platform
        </p>

        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow-sm">

          <p className="text-gray-800 mb-6">
            If a fair die is rolled until a 6 appears,
            what is the expected number of rolls?
          </p>

          <div className="grid grid-cols-2 gap-3">
            {["2", "3", "3.6", "4"].map((opt, i) => (
              <button
                key={i}
                className="border p-2 rounded hover:bg-indigo-50 transition"
              >
                {opt}
              </button>
            ))}
          </div>

          <button className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md">
            Submit
          </button>

        </div>

      </div>
      
      {/* WHAT WE DO SECTION */}
      <div className="py-24 px-6 text-center">

        <p className="text-indigo-600 font-medium mb-2">
          What we do
        </p>

        <h2 className="text-4xl font-semibold mb-6">
          Everything you need to crack interviews
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          We help you prepare smarter with structured practice,
          real interview questions, and powerful tools.
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 border rounded-xl hover:shadow-lg transition text-left"
          >
            <FaBrain className="text-indigo-600 text-2xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Structured Practice
            </h3>
            <p className="text-gray-500 text-sm">
              Practice questions in a structured way to build strong fundamentals.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 border rounded-xl hover:shadow-lg transition text-left"
          >
            <FaChartLine className="text-indigo-600 text-2xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Track Progress
            </h3>
            <p className="text-gray-500 text-sm">
              Monitor your improvement and focus on weak areas efficiently.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 border rounded-xl hover:shadow-lg transition text-left"
          >
            <FaFileAlt className="text-indigo-600 text-2xl mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Resume Builder
            </h3>
            <p className="text-gray-500 text-sm">
              Create strong resumes that stand out to recruiters.
            </p>
          </motion.div>

        </div>
      </div>

{/* WHO SHOULD USE SECTION */}
<div className="bg-blue-50 py-24 px-6 text-center">

  {/* Heading */}
  <h2 className="text-4xl font-bold mb-6">
    Who Should Use AI Mock Interview Practice?
  </h2>

  {/* Description */}
  <p className="text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
    This platform is designed for learners and professionals preparing for interviews —
    from students and job seekers to career changers aiming for growth.
  </p>

  {/* Cards */}
  <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

    {/* Card 1 */}
    <motion.div whileHover={{ y: -5 }} className="text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="non-native"
        className="w-24 h-24 mx-auto mb-4"
      />
      <h3 className="font-semibold text-lg mb-2">
        Non-native English Speakers
      </h3>
      <p className="text-gray-500 text-sm">
        Improve fluency, confidence, and communication skills for interviews.
      </p>
    </motion.div>

    {/* Card 2 */}
    <motion.div whileHover={{ y: -5 }} className="text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
        alt="job"
        className="w-24 h-24 mx-auto mb-4"
      />
      <h3 className="font-semibold text-lg mb-2">
        Job Seekers
      </h3>
      <p className="text-gray-500 text-sm">
        Practice real interview questions and deliver confident answers.
      </p>
    </motion.div>

    {/* Card 3 */}
    <motion.div whileHover={{ y: -5 }} className="text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
        alt="students"
        className="w-24 h-24 mx-auto mb-4"
      />
      <h3 className="font-semibold text-lg mb-2">
        Students & Graduates
      </h3>
      <p className="text-gray-500 text-sm">
        Transition smoothly into careers with guided interview preparation.
      </p>
    </motion.div>

    {/* Card 4 */}
    <motion.div whileHover={{ y: -5 }} className="text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
        alt="career"
        className="w-24 h-24 mx-auto mb-4"
      />
      <h3 className="font-semibold text-lg mb-2">
        Career Changers
      </h3>
      <p className="text-gray-500 text-sm">
        Build confidence and switch careers with structured preparation.
      </p>
    </motion.div>

  </div>

</div>



{/* HOW IT WORKS SECTION */}
<div className="bg-gradient-to-b from-white to-blue-50 py-24 px-6 text-center">

  {/* Heading */}
  <h2 className="text-4xl font-bold mb-6">
    How Our AI Mock Interview Works
  </h2>

  {/* Description */}
  <p className="text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
    Practice real interview questions with AI, get instant feedback,
    and improve your communication skills step by step.
  </p>

  {/* STEPS */}
  <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

    {/* STEP 1 */}
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center"
    >
      <div className="text-5xl mb-4">✨</div>
      <h3 className="font-semibold text-lg mb-2">
        Choose Your Role
      </h3>
      <p className="text-gray-500 text-sm">
        Select a role or domain that matches your career goals.
      </p>
    </motion.div>

    {/* STEP 2 */}
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center"
    >
      <div className="text-5xl mb-4">🎤</div>
      <h3 className="font-semibold text-lg mb-2">
        Start Mock Interview
      </h3>
      <p className="text-gray-500 text-sm">
        Answer real interview questions using AI-powered simulation.
      </p>
    </motion.div>

    {/* STEP 3 */}
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center"
    >
      <div className="text-5xl mb-4">🤖</div>
      <h3 className="font-semibold text-lg mb-2">
        Get Instant Feedback
      </h3>
      <p className="text-gray-500 text-sm">
        Receive detailed insights on your answers and communication.
      </p>
    </motion.div>

    {/* STEP 4 */}
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center"
    >
      <div className="text-5xl mb-4">📊</div>
      <h3 className="font-semibold text-lg mb-2">
        Track Progress
      </h3>
      <p className="text-gray-500 text-sm">
        Monitor improvement and build confidence over time.
      </p>
    </motion.div>

  </div>

</div>
      {/* STATS */}
      <div className="max-w-5xl mx-auto py-20 grid md:grid-cols-3 gap-8 text-center">

        

      </div>

      {/* FOOTER (OUTSIDE GRID) */}
      <div className="w-full bg-blue-50 text-gray-800 px-10 py-16">

        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-12">

          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              InterPrep
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              InterPrep helps you enhance your technical skills,
              practice real interview questions,
              help you maintain your mental health, and prepare effectively
              for your dream job.
            </p>

            <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition cursor-pointer">
              <FaLinkedin />
            </div>
          </div>

          {/* MIDDLE */}
          <div className="flex flex-col gap-3 text-sm">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <span className="hover:text-blue-600 cursor-pointer">Questions</span>
            <span className="hover:text-blue-600 cursor-pointer">Discussion</span>
            <span className="hover:text-blue-600 cursor-pointer">Practice</span>
            <span className="hover:text-blue-600 cursor-pointer">Pricing</span>
            <span className="hover:text-blue-600 cursor-pointer">Contact Us</span>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-3 text-sm">
            <span className="hover:text-blue-600 cursor-pointer">Feedback</span>
            <span className="hover:text-blue-600 cursor-pointer">Terms of Use</span>
            <span className="hover:text-blue-600 cursor-pointer">Privacy Policy</span>
          </div>

        </div>

       

</div>
      </div>
      

   
  );
}