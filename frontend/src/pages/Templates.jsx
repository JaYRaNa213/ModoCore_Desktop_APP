import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/Button";
import {
  Rocket,
  Trash,
  Timer,
  FolderKanban,
  BarChart,
  Eye,
  Plus,
} from "lucide-react";

export default function Templates() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/templates").then((res) => {
      setTemplates(res.data);
    });
  }, []);

  const handleLaunch = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/templates/${id}/launch`);
      alert("Template launched!");
    } catch (err) {
      console.error("Launch failed", err);
      alert("Failed to launch");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this template?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:5000/api/templates/${id}`);
      setTemplates(templates.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">📁 Your Templates</h2>
        <Link to="/add-template">
          <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
            <Plus size={16} /> Add New Template
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-700">
                {template.title}
              </h3>
              <span className="text-xs text-gray-500">
                {template.workspace || "No Group"}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{template.description}</p>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FolderKanban size={16} /> Workspace:{" "}
                <strong>{template.workspace || "None"}</strong>
              </div>
              <div className="flex items-center gap-2">
                <BarChart size={16} /> Usage Count:{" "}
                <strong>{template.usageCount || 0}</strong>
              </div>
              {template.schedule && (
                <div className="flex items-center gap-2">
                  <Timer size={16} /> Scheduled:{" "}
                  <strong>{template.schedule}</strong>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <Button
                onClick={() => handleLaunch(template._id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1"
              >
                <Rocket size={18} className="mr-2" />
                Launch
              </Button>

              <Link to={`/template/${template._id}`} className="flex-1">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  <Eye size={18} className="mr-2" />
                  View Details
                </Button>
              </Link>

              <Button
                onClick={() => handleDelete(template._id)}
                className="bg-red-600 hover:bg-red-700 text-white flex-1"
              >
                <Trash size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
