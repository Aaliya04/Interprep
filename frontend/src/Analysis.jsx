import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaBrain, FaRegCheckCircle } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

export default function Analysis() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div className="p-10 text-center font-bold">No Data Available.</div>;

  const chartData = {
    labels: state.stressHistory.map((_, i) => `${i}s`),
    datasets: [{
      label: "Stress Level",
      data: state.stressHistory,
      borderColor: "#4f46e5",
      backgroundColor: "rgba(79, 70, 229, 0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 0
    }]
  };

  const options = {
    responsive: true,
    scales: { y: { min: 0, max: 10, ticks: { stepSize: 2 } } },
    plugins: { legend: { display: false } }
  };

  return (
    <div className="min-h-screen bg-sky-50 p-6 md:p-12 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate("/")} className="mb-8 flex items-center gap-2 font-black text-xs text-slate-400 hover:text-indigo-600 transition-all">
          <FaArrowLeft /> RETURN TO HOME
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-sky-100">
            <h1 className="text-4xl font-black text-slate-800 mb-2">Detailed Report</h1>
            <p className="text-slate-500 font-medium mb-8 uppercase text-[10px] tracking-widest">AI Emotional & Verbal Analysis</p>
            
            {/* THE CHART */}
            <div className="h-64 w-full">
               <Line data={chartData} options={options} />
            </div>
            <p className="mt-4 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">Stress Waveform (Time vs Intensity)</p>
          </div>

          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white flex flex-col justify-center items-center shadow-2xl shadow-indigo-200">
            <FaBrain className="text-4xl mb-6 opacity-50" />
            <p className="text-[10px] font-black opacity-60 uppercase mb-2">Avg Stress Score</p>
            <h2 className="text-7xl font-black mb-2">{state.avgStress}</h2>
            <div className="mt-4 bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
              {state.avgStress < 4 ? "STABLE" : "ELEVATED"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
              <h3 className="font-bold text-indigo-400 uppercase text-xs mb-6 tracking-widest">Critical Observations</h3>
              <ul className="space-y-4">
                 <li className="flex gap-4 text-sm font-medium text-slate-300">
                    <FaRegCheckCircle className="text-emerald-400 mt-1" /> Eye contact remained within professional norms.
                 </li>
                 <li className="flex gap-4 text-sm font-medium text-slate-300">
                    <FaRegCheckCircle className="text-indigo-400 mt-1" /> Speech rate was optimized for technical clarity.
                 </li>
              </ul>
           </div>
           
           <div className="bg-white p-8 rounded-[2.5rem] border border-sky-100 shadow-sm flex items-center justify-center">
              <button onClick={() => window.print()} className="w-full h-full border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-black text-xs hover:bg-slate-50 transition-all">
                EXPORT PDF REPORT
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}