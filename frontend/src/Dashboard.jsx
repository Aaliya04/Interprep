import { useNavigate } from "react-router-dom";
import ProgressDashboard from "./ProgressDashboard";

export default function Dashboard() {
  const navigate = useNavigate();

  const profile = {
    name: "Aaliya",
    college: "Your College",
    year: "3rd Year",
    target: "Software Engineer",
  };

  return (
    <div className="flex min-h-screen bg-blue-50">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
      

        {/* Top */}
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-8">
            InterPrep
          </h2>

          <div className="flex flex-col gap-4 text-gray-600">

            <button
              onClick={() => navigate("/dashboard")}
              className="text-left hover:text-blue-600"
            >
              Dashboard
            </button>

            <button
             onClick={() => navigate("/dashboard")}
              className="text-left hover:text-blue-600"
            >
              Mock Interview
            </button>

            <button
              onClick={() => navigate("/test")}
              className="text-left hover:text-blue-600"
            >
              Aptitude
            </button>

            <button
              onClick={() => navigate("/resume")}
              className="text-left hover:text-blue-600"
            >
              Resume
            </button>

          </div>
        </div>

        {/* PROFILE */}
        <div className="bg-blue-50 p-4 rounded-xl">

          <h3 className="font-semibold">{profile.name}</h3>
          <p className="text-sm text-gray-500">{profile.college}</p>
          <p className="text-sm text-gray-500">{profile.year}</p>
          <p className="text-sm text-blue-600 mt-1">
            🎯 {profile.target}
          </p>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6">
          Welcome back, {profile.name} 👋
        </h1>

        {/* Progress Dashboard */}
        <ProgressDashboard />

      </div>

    </div>
  );
}