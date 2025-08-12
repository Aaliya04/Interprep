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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
      <div className="p-8 w-96 bg-white text-black rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-3"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-3"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-3"
        />
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <button onClick={handleSignup} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold">Create Account</button>
        <p className="mt-4 text-sm text-center">Already have an account? <a href="/" className="text-pink-600 font-medium">Login</a></p>
      </div>
    </div>
  );
}