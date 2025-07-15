import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

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
      console.error("Failed to launch template", err);
      alert("Launch failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        📁 Your Templates
      </h2>
      <ul className="space-y-4">
        {templates.map((template) => (
          <li
            key={template._id}
            className="relative bg-white p-4 shadow rounded-lg"
          >
            <button
              className="absolute top-2 right-2 text-xs text-indigo-600 underline"
              onClick={() => navigate(`/templates/edit/${template._id}`)}
            >
              ✏️ Edit
            </button>
            <h3 className="text-xl font-semibold">{template.title}</h3>
            <p className="text-gray-600 mb-2">{template.description}</p>

            <Button onClick={() => handleLaunch(template._id)}>
              🚀 Launch
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
