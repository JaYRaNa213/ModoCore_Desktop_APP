import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopTemplates } from "../services/TemplateService";
import {
  Rocket,
  Clock,
  BookOpen,
  Bot,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";

export default function Dashboard() {
  const [topTemplates, setTopTemplates] = useState([]);
  const [activeMode, setActiveMode] = useState("None");
  const totalFocusTime = "3h 45m";

  useEffect(() => {
  const fetchTopTemplates = async () => {
    try {
      const data = await getTopTemplates(3);
      if (Array.isArray(data)) {
        setTopTemplates(data);
      } else {
        setTopTemplates([]);
        console.warn("Expected array but got:", data);
      }
    } catch (error) {
      console.error("Error fetching top templates:", error);
      setTopTemplates([]);
    }
  };

  fetchTopTemplates();
}, []);


  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">🚀 Welcome back</h1>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
          BETA v1.0.0
        </span>
      </div>

      {/* Current Mode */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <Rocket size={20} /> Current Mode
          </h2>
          <div className="text-2xl font-bold text-indigo-800">
            {activeMode}
          </div>
          <button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={() => setActiveMode("💻 Coding Mode")}
          >
            Activate Coding Mode
          </button>
        </CardContent>
      </Card>

      {/* Top Templates */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Flame size={20} /> Top 3 Most Used Templates
          </h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {topTemplates.map((template) => (
              <div
                key={template._id}
                className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-indigo-800 mb-1">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-600">{template.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Usage: {template.usageCount}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Focus Summary */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
            <Clock size={20} /> Today’s Focus Time
          </h2>
          <p className="text-2xl text-green-700 font-bold">
            {totalFocusTime}
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 pt-4">
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
