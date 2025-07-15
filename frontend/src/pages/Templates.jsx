import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";
import {
  Rocket,
  Trash,
  Timer,
  BarChart,
  Eye,
  Plus,
  Pencil,
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
      alert("✅ Template launched!");
    } catch (err) {
      console.error("🚨 Launch failed", err.response?.data || err.message);
      alert("❌ Launch failed: " + (err.response?.data?.details || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;

    try {
      await axios.delete(`/api/templates/${id}`);
      toast.success("Template deleted");
      setTemplates(templates.filter((t) => t._id !== id)); // locally remove
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete template");
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
            className="relative bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition"
          >
            {/* Edit Button in top right */}
            <Link
              to={`/templates/edit/${template._id}`}
              className="absolute top-3 right-3 bg-yellow-400 hover:bg-yellow-500 text-white p-1.5 rounded-full shadow-md transition-transform hover:scale-105"
              title="Edit Template"
            >
              <Pencil size={18} />
            </Link>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-700">
                {template.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-4">{template.description}</p>

            <div className="space-y-2 text-sm text-gray-700">
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
                  View
                </Button>
              </Link>

              <Button
                onClick={() => handleDelete(template._id)}
                className="bg-red-600 hover:bg-red-700 text-white flex-1"
              > Delete
                
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
