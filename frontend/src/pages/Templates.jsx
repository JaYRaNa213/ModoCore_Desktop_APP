// src/pages/Templates.jsx
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button"; // ✅ Add this line

export default function Templates() {
  const sampleTemplates = [
    { id: "focus-mode", name: "Focus Coding Template" },
    { id: "meeting-mode", name: "Team Meeting Template" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📂 Templates</h1>

      <div className="flex justify-end">
        <Link to="/templates/new">
          <Button className="mb-4">➕ Add New Template</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sampleTemplates.map((template) => (
          <div key={template.id} className="bg-white p-4 shadow rounded-lg border">
            <h2 className="text-lg font-semibold text-indigo-700">{template.name}</h2>
            <Link
              to={`/template/${template.id}`}
              className="text-blue-500 text-sm hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
