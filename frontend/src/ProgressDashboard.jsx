import { motion } from "framer-motion";
import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function ProgressDashboard() {
  // Dummy data (later connect backend)
  const data = [
    { day: "Mon", score: 60 },
    { day: "Tue", score: 65 },
    { day: "Wed", score: 70 },
    { day: "Thu", score: 75 },
    { day: "Fri", score: 80 },
    { day: "Sat", score: 85 },
    { day: "Sun", score: 90 },
  ];

  return (
    <div className="bg-blue-50 py-24 px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">
          Your Performance Dashboard 📊
        </h2>
        <p className="text-gray-600 mt-2">
          Track your growth with smart analytics
        </p>
      </div>

      {/* Top Stats */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 mb-16">

        {/* Score */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-3xl font-bold text-blue-600">85%</h3>
          <p className="text-gray-500">Overall Score</p>
        </motion.div>

        {/* Interviews */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-3xl font-bold text-blue-600">18</h3>
          <p className="text-gray-500">Interviews Done</p>
        </motion.div>

        {/* Streak */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-3xl font-bold text-orange-500">🔥 7</h3>
          <p className="text-gray-500">Day Streak</p>
        </motion.div>

        {/* AI Score */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-3xl font-bold text-green-600">A+</h3>
          <p className="text-gray-500">AI Feedback</p>
        </motion.div>

      </div>

      {/* Chart */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow mb-16">

        <h3 className="font-semibold mb-4">
          Weekly Performance
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* AI Feedback Breakdown */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Communication</h4>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-blue-600 h-2 w-[80%] rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">80%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Confidence</h4>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-green-500 h-2 w-[75%] rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">75%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h4 className="font-semibold mb-2">Technical Knowledge</h4>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-purple-500 h-2 w-[85%] rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">85%</p>
        </div>

      </div>

    </div>
  );
}