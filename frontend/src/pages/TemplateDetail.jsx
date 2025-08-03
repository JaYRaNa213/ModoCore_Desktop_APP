import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Pencil, Rocket, ArrowLeft } from "lucide-react";
import { getGuestTemplates } from "../utils/guestTemplates";
import { doLaunch } from "../utils/guestTemplates";
import { purgeOldGuestTemplates } from "../utils/guestTemplates";
import { useAuth } from "../auth/AuthContext";


export default function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const guestTemplates = getGuestTemplates();
  const found = guestTemplates.find(t => t._id === id); // for guest

  // const res = await axios.get(`/api/templates/${id}`); // for logged in

  const { user } = useAuth(); 
  

  // useEffect(() => {
  //   const fetchTemplate = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/api/templates/${id}`);
  //       setTemplate(res.data);
  //     } catch (err) {
  //       console.error("Error loading template:", err);
  //       alert("Template not found");
  //       navigate("/templates");
  //     }
  //   };

  //   fetchTemplate();
  // }, [id, navigate]);

  
    useEffect(() => {
  const fetchTemplate = async () => {
    try {
      if (user) {
        // Logged-in: fetch from backend
        const res = await axios.get(`http://localhost:5000/api/templates/${id}`);
        setTemplate(res.data);
      } else {
        // Guest: find from localStorage
        const guestTemplates = getGuestTemplates();
        const found = guestTemplates.find((t) => t._id === id);
        if (!found) throw new Error("Template not found in guest templates");
        setTemplate(found);
      }
    } catch (err) {
      console.error("Error loading template:", err);
      alert("Template not found.");
      navigate("/templates");
    }
  };

  fetchTemplate();
}, [id, user, navigate]);


  const handleLaunch = async (template) => {
  try {
    const hasApps = Array.isArray(template.apps) && template.apps.length > 0;
    const hasWebsites = Array.isArray(template.websites) && template.websites.length > 0;

    if (!hasApps && !hasWebsites) {
      alert("⚠️ This template has no apps or websites to launch.");
      return;
    }

    if (user && template._id) {
      
      await axios.post(`http://localhost:5000/api/templates/${template._id}/launch`);
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

  if (!template)
    return <div className="p-6 text-gray-600">Loading template...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">📝 Template Preview</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/templates/edit/${id}`)}
            className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
          >
            <Pencil size={16} /> Edit
          </button>
          <button
            onClick={() => navigate(`/templates/edit/${template._id}`)}
            className="text-sm text-blue-500 hover:underline flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">
          {template.title}
        </h2>
        <p className="text-gray-600 mb-4">{template.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <p className="font-medium">🧩 Apps:</p>
            <ul className="list-disc pl-4 mt-1">
              {template.apps.length > 0 ? (
                template.apps.map((app, idx) => <li key={idx}>{app}</li>)
              ) : (
                <li className="italic text-gray-400">No apps specified</li>
              )}
            </ul>
          </div>
          <div>
            <p className="font-medium">🌐 Websites:</p>
            <ul className="list-disc pl-4 mt-1">
              {template.websites.length > 0 ? (
                template.websites.map((url, idx) => <li key={idx}>{url}</li>)
              ) : (
                <li className="italic text-gray-400">No websites specified</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          {/* <p>
            <strong>📁 Workspace:</strong> {template.workspace || "Not assigned"}
          </p> */}
          <p>
            <strong>📊 Usage Count:</strong> {template.usageCount || 0}
          </p>
          {template.schedule && (
            <p>
              <strong>⏰ Scheduled:</strong> {template.schedule}
            </p>
          )}
        </div>

        <Button
  onClick={() => handleLaunch(template)}
  className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
>
  <Rocket size={18} />
  Launch This Template
</Button>

      </div>
    </div>
  );
}
