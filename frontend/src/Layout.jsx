import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5 bg-blue-50 border-b border-blue-100 sticky top-0 z-50">

        {/* Logo */}
        <h1
          onClick={() => navigate("/home")}
          className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent cursor-pointer"
        >
          InterPrep
        </h1>

        {/* Menu */}
        <div className="flex gap-8 text-sm text-gray-600">
          <span
            onClick={() => navigate("/home")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Home
          </span>

          <span
            onClick={() => navigate("/test")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Aptitude
          </span>

          <span
            onClick={() => navigate("/resume")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Resume
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          Logout
        </button>

      </div>
      <span
  onClick={() => navigate("/dashboard")}
  className="hover:text-blue-600 cursor-pointer"
>
  Dashboard
</span>

      {/* PAGE CONTENT */}
      <div className="p-6">
        <Outlet />
      </div>

    </div>
  );
}