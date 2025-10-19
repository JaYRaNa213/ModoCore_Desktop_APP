// TemplateDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Pencil, Rocket, ArrowLeft } from "lucide-react";
import { doLaunch } from "../utils/guestTemplates";
import { useAuth } from "../context/AuthContext";
import { getTemplateById } from "../services/TemplateService"; // ✅ use service

import api from "../services/api"; // ✅ use API wrapper (with token)
import axios from "axios"; // fallback if you want direct calls

export default function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        if (!id) throw new Error("No template ID");

        // ✅ use the service (handles user vs guest correctly)
        const found = await getTemplateById(id, user);
        if (!found) throw new Error("Template not found");

        setTemplate(found);
      } catch (err) {
        console.error("Error loading template:", err);
        alert("❌ Template not found.");
        navigate("/templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, user, navigate]);

    // ✅ no parameter needed
  const handleLaunch = async () => {
    try {
      const hasApps = Array.isArray(template.apps) && template.apps.length > 0;
      const hasWebsites = Array.isArray(template.websites) && template.websites.length > 0;

      if (!hasApps && !hasWebsites) {
        alert("⚠️ This template has no apps or websites to launch.");
        return;
      }

      if (user && template._id) {
        // ✅ use API wrapper (automatically includes token)
        await api.post(`/templates/${template._id}/launch`);
        alert("✅ Template launched!");
      } else {
        await doLaunch(template);
        alert("✅ Guest template launched!");
      }
    } catch (err) {
      console.error("🚨 Launch failed", err.response?.data || err.message);
      alert("❌ Launch failed: " + (err.response?.data?.details || err.message));
    }
  };


  if (loading) return <div className="p-6 text-gray-500">⏳ Loading template...</div>;
  if (!template) return <div className="p-6 text-red-500">⚠️ Template not found.</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white-800">📝 Template Preview</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/templates/edit/${template._id || template.id}`)}
            className="text-sm text-white-700 hover:underline flex items-center gap-1"
          >
            <Pencil size={16} /> Edit
          </button>
          <button
            onClick={() => navigate("/templates")}
            className="text-sm text-white-500 hover:underline flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </div>

      <div className="bg-[#0d131f] shadow-lg rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">
          {template.title}
        </h2>
        <p className="text-gray-600 mb-4">{template.description}</p>

        {/* apps + websites */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-white-700">
          <div>
            <p className="font-medium">🧩 Apps:</p>
            <ul className="list-disc pl-4 mt-1">
              {template.apps?.length > 0 ? (
                template.apps.map((app, idx) => <li key={idx}>{app}</li>)
              ) : (
                <li className="italic text-gray-500">No apps specified</li>
              )}
            </ul>
          </div>
          <div>
            <p className="font-medium">🌐 Websites:</p>
            <ul className="list-disc pl-4 mt-1">
              {template.websites?.length > 0 ? (
                template.websites.map((url, idx) => <li key={idx}>{url}</li>)
              ) : (
                <li className="italic text-gray-400">No websites specified</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-sm text-white-700">
          <p><strong>📊 Usage Count:</strong> {template.usageCount || 0}</p>
          {template.schedule && (
            <p><strong>⏰ Scheduled:</strong> {template.schedule}</p>
          )}
        </div>

        <Button
          onClick={handleLaunch}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          <Rocket size={18} />
          Launch This Template
        </Button>
      </div>
    </div>
  );
}
