// src/pages/Dashboard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  BookOpen,
  Briefcase,
  Coffee,
  Clock,
  Bot,
  ShieldCheck,
} from "lucide-react";

export default function Dashboard() {
  const [activeMode, setActiveMode] = useState("None");
  const recentModes = ["📚 Study Mode", "🧑‍💼 Meeting Mode", "☕ Break Mode"];
  const totalFocusTime = "3h 45m";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">🚀 Welcome back</h1>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
          BETA v1.0.0
        </span>
      </div>

      {/* Current Mode */}
      <div className="bg-indigo-50 border border-indigo-200 shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center gap-2">
          <Rocket size={20} /> Current Mode
        </h2>
        <div className="text-2xl font-bold text-indigo-800">{activeMode}</div>
        <button
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => setActiveMode("💻 Coding Mode")}
        >
          Activate Coding Mode
        </button>
      </div>

      {/* Recently Used Modes */}
      <div className="bg-white border shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Clock size={20} /> Recently Used Modes
        </h2>
        <ul className="list-inside list-disc text-gray-700 space-y-1">
          {recentModes.map((mode, index) => (
            <li key={index} className="text-base">{mode}</li>
          ))}
        </ul>
      </div>

      {/* Focus Summary */}
      <div className="bg-green-50 border border-green-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
          <Clock size={20} /> Today’s Focus Time
        </h2>
        <p className="text-2xl text-green-700 font-bold">{totalFocusTime}</p>
      </div>

      {/* Call To Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-6">
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          <BookOpen size={18} /> New Work Template
        </Link>

        <Link
          to="/automations"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          <Bot size={18} /> View Automations
        </Link>

        <Link
          to="/admin"
          className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
        >
          <ShieldCheck size={18} /> Admin Panel
        </Link>
      </div>
    </div>
  );
}
