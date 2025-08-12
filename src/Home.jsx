// File: src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

export default function Home() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "Student Name",
    college: "College",
    year: "Year",
    targetCompany: "Target Company"
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) setProfile(saved);
  }, [isModalOpen]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  

  const sections = [
    { title: "Mock Interviews", desc: "Practice with real-time Q&A sessions." },
    { title: "Aptitude Tests", desc: "Sharpen your quantitative and logical skills." },
    { title: "Resume Builder", desc: "Create a professional resume easily." },
    { title: "HR Questions", desc: "Prepare for common HR round questions." },
    { title: "Technical MCQs", desc: "Test your coding knowledge and core concepts." },
    { title: "Interview Experiences", desc: "Read real candidate experiences from top companies." },
  ];
  

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white relative">
      
      {/* Three-dot toggle button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="absolute top-5 left-4 z-20 text-white text-3xl font-bold bg-white/10 hover:bg-white/20 px-3 py-1 rounded"
      >
        ⋮
      </button>

      {/* Left Profile Sidebar */}
      {showSidebar && (
        <div className="w-80 bg-white/10 backdrop-blur-md text-white p-6 z-10 flex flex-col items-center shadow-xl">
          <div className="w-24 h-24 bg-white rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-sm">{profile.year}</p>
          <p className="text-sm">{profile.college}</p>
          <p className="text-sm">Target: {profile.targetCompany}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Right Main Content */}
      <div className="flex-1 p-8 ml-2">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-300">Interview Preparation Hub</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((item, idx) => (
  <div
    key={idx}
    onClick={() => {
      if (item.title === "Resume Builder") navigate("/resume");
       else if (item.title === "Aptitude Tests") navigate("/test");
    }}
    className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-indigo-500 cursor-pointer"
  >
    <h2 className="text-xl font-semibold text-indigo-200 mb-2">{item.title}</h2>
    <p className="text-white/80">{item.desc}</p>
  </div>
))}



        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
