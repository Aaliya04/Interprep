// import { useNavigate } from "react-router-dom";

// export default function Interview() {
//   const navigate = useNavigate();

//   const sections = [
//     {
//       title: "Technical",
//       desc: "Test your coding and core concepts",
//       color: "bg-blue-600"
//     },
//     {
//       title: "HR",
//       desc: "Prepare HR questions and answers",
//       color: "bg-green-600"
//     },
//     {
//       title: "Behavioural",
//       desc: "Handle real-life situations",
//       color: "bg-purple-600"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-sky-100 text-slate-900 p-10">
//       <h1 className="text-3xl font-bold mb-10 text-center">
//         AI Interview Preparation
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {sections.map((sec) => (
//           <div
//             key={sec.title}
//             // className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md shadow-2xl text-center border border-white/10 text-white"
//             className="p-6 rounded-2xl bg-violet-500/20 backdrop-blur-lg shadow-2xl text-center border border-white/40 text-purple-900"
//           >
//             <h2 className="text-xl font-bold mb-2">{sec.title}</h2>
//             <p className="text-black/70 mb-4">{sec.desc}</p>

//             <button
//               onClick={() => navigate(`/interview/${sec.title}`)}
//               className={`${sec.color} px-4 py-2 rounded text-white`}
//             >
//               Start Interview
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCode, FaUsers, FaUserTie } from "react-icons/fa";

export default function Interview() {
  const navigate = useNavigate();

  const sections = [
    { title: "Technical", desc: "Test your coding and core concepts.", icon: <FaCode />, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "HR", desc: "Common behavioral and background questions.", icon: <FaUsers />, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Behavioural", desc: "STAR method and situational challenges.", icon: <FaUserTie />, color: "text-purple-600", bg: "bg-purple-100" }
  ];

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Select Interview Type</h1>
        <p className="text-gray-500 text-center mb-12">Our AI will monitor your stress levels and communication in real-time.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((sec) => (
            <motion.div
              key={sec.title}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-blue-900/5 flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 ${sec.bg} ${sec.color} rounded-full flex items-center justify-center text-2xl mb-6`}>
                {sec.icon}
              </div>
              <h2 className="text-2xl font-bold mb-3">{sec.title}</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">{sec.desc}</p>
              <button
                onClick={() => navigate(`/interview/${sec.title}`)}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Start Session
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}