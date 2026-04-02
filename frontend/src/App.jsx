import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AptitudeTests from "./AptitudeTests";
import Dashboard from "./Dashboard";
import Home from "./Home";
// import Interview from "./Interview";
import Layout from "./Layout";
import Login from "./Login";
import ResumeBuilder from "./ResumeBuilder";
import Signup from "./Signup";
import TemplateGallery from "./TemplateGallery";

const isAuthenticated = () => !!localStorage.getItem("user");

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/resume" element={<ResumeBuilder />} />
          <Route path="/test" element={<AptitudeTests />} />
          <Route path="/template-gallery" element={<TemplateGallery />} />
          {/* <Route path="/interview" element={<Interview />} /> */}
          
        </Route>

      </Routes>
    </Router>
  );
}