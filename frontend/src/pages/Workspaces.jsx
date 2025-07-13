// src/pages/Workspaces.jsx
import { Briefcase, Headphones, Laptop2 } from "lucide-react";

const workspaces = [
  {
    category: "Focus Zone",
    icon: <Laptop2 className="text-indigo-500" />,
    templates: ["Deep Work", "Writing Mode", "No Distractions"],
  },
  {
    category: "Meeting Suite",
    icon: <Briefcase className="text-green-500" />,
    templates: ["Client Call", "Daily Standup", "Zoom Setup"],
  },
  {
    category: "Relax Lounge",
    icon: <Headphones className="text-purple-500" />,
    templates: ["Lo-Fi Vibes", "Break Mode", "Calm Reading"],
  },
];

export default function Workspaces() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">🧠 Workspaces</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {workspaces.map((ws, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              {ws.icon}
              <h2 className="text-lg font-semibold text-gray-700">
                {ws.category}
              </h2>
            </div>
            <ul className="text-gray-600 mb-4 list-disc pl-6">
              {ws.templates.map((tpl, i) => (
                <li key={i}>{tpl}</li>
              ))}
            </ul>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              Activate Workspace
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
