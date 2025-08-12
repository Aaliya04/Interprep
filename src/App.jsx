import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AptitudeTests from "./AptitudeTests";
import Home from "./Home";
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
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/template-gallery" element={<TemplateGallery />} />
   \
        <Route
  path="/resume"
  element={
    <ProtectedRoute>
      <ResumeBuilder />
    </ProtectedRoute>
  }
/>
<Route
path="/test"
element={
  <ProtectedRoute>
    <AptitudeTests/>
  </ProtectedRoute>
}
/>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> */}
          
      </Routes>
    </Router>
  );
}