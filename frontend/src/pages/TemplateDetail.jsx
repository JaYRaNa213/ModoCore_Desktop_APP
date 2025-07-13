// src/pages/TemplateDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example: Fetch template by ID (later you'll replace with real data)
  useEffect(() => {
    // fetchTemplate(id).then(setData)...
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">📝 Template Preview</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-500 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Preview Block */}
      <div className="bg-white shadow rounded-xl p-6 border">
        <h2 className="text-xl font-semibold text-indigo-600 mb-2">Focus Coding Template</h2>
        <p className="text-gray-600 mb-4">
          This template launches VS Code, opens GitHub, starts your music, and blocks social media.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">Tasks:</p>
            <ul className="list-disc pl-4">
              <li>Open VS Code</li>
              <li>Run local server</li>
              <li>Open GitHub issues</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Apps:</p>
            <p>VS Code, Chrome, Spotify</p>
            <p className="mt-2 font-medium">Notes:</p>
            <p>Today's goal: Finish Dashboard layout.</p>
          </div>
        </div>

        <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          ➤ Launch This Template
        </button>
      </div>
    </div>
  );
}
