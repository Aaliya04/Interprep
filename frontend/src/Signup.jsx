import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const validatePassword = (pwd) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return regex.test(pwd);
};
  const handleSignup = async () => {
  console.log("clicked", name, email, password);
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
      return;
    }

    try {
     const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) throw new Error(await res.text());
      localStorage.setItem("user", "loggedIn");
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

   return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800">
    
    <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">
      
      <h2 className="text-3xl font-semibold text-center mb-2">
        Create Account
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        Start your interview journey with us
      </p>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-800 placeholder-gray-400"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-800 placeholder-gray-400"
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-800 placeholder-gray-400"
      />

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <button
        onClick={handleSignup}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        Create Account
      </button>

      <p className="mt-5 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a href="/" className="text-indigo-600 font-medium hover:underline">
          Login
        </a>
      </p>

    </div>
  </div>
  );
}