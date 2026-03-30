// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       if (!res.ok) throw new Error(await res.text());
//       // localStorage.setItem("user", "loggedIn");
//       const data = await res.json();
// localStorage.setItem("user", JSON.stringify(data.user));
//       navigate("/home");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//     return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
//       <div className="p-8 w-96 bg-white text-black rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
//         />
//         <input
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 w-full mb-6"
//         />
//         <button onClick={handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold">Login</button>
//         <p className="mt-4 text-sm text-center">Don't have an account? <a href="/signup" className="text-indigo-600 font-medium">Signup</a></p>
//       </div>
//     </div>
//   );
// }




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       // ✅ Read response once
//       const data = await res.json();

//       // ✅ Handle error properly
//       if (!res.ok) {
//         alert(data.message || "Login failed");
//         return;
//       }

//       // ✅ Store user correctly
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // ✅ Navigate
//       navigate("/home");

//     } catch (err) {
//       console.error(err);
//       alert("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
//       <div className="p-8 w-96 bg-white text-black rounded-2xl shadow-lg">
//         <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
//         />

//         <input
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-gray-300 rounded px-3 py-2 w-full mb-6"
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
//         >
//           Login
//         </button>

//         <p className="mt-4 text-sm text-center">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-indigo-600 font-medium">
//             Signup
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }






import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Store user correctly
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect
      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="p-8 w-96 bg-white text-black rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
