import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";
import { Card, CardContent } from "../components/ui/Card";

import { createTemplate } from "../services/TemplateService";

export default function AddTemplate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [apps, setApps] = useState([""]);
  const [websites, setWebsites] = useState([""]);
  const [workspace, setWorkspace] = useState("");
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddApp = () => setApps([...apps, ""]);
  const handleAddWebsite = () => setWebsites([...websites, ""]);

  const handleAppChange = (index, value) => {
    const updated = [...apps];
    updated[index] = value;
    setApps(updated);
  };

  const handleWebsiteChange = (index, value) => {
    const updated = [...websites];
    updated[index] = value;
    setWebsites(updated);
  };

  const handleRemoveApp = (index) => {
    const updated = apps.filter((_, i) => i !== index);
    setApps(updated);
  };

  const handleRemoveWebsite = (index) => {
    const updated = websites.filter((_, i) => i !== index);
    setWebsites(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filteredApps = apps.filter((a) => a.trim() !== "");
    const filteredWebsites = websites.filter((w) => w.trim() !== "");

    const newTemplate = {
      title: title.trim(),
      description: description.trim(),
      workspace: workspace.trim(),
      schedule: schedule.trim(),
      apps: filteredApps,
      websites: filteredWebsites,
    };

    try {
      if (!newTemplate.title) {
        toast.error("Template title is required.");
        setLoading(false);
        return;
      }

      if (filteredApps.length === 0 && filteredWebsites.length === 0) {
        toast.error("Add at least one app or website.");
        setLoading(false);
        return;
      }

      await createTemplate(newTemplate);
      toast.success("Template created!");
      navigate("/templates");
    } catch (err) {
      console.error("Error creating template:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card className="p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-indigo-700">📝 Create New Work Template</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Template Title *</label>
              <Input
                placeholder="e.g. Design Mode"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                placeholder="Briefly describe this template..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Workspace Group */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Workspace Group</label>
              <select
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-indigo-500 text-sm"
              >
                <option value="">-- Select workspace --</option>
                <option value="Coding">💻 Coding</option>
                <option value="Meeting">📞 Meeting</option>
                <option value="Design">🎨 Design</option>
                <option value="Writing">✍️ Writing</option>
                <option value="Custom">🔧 Custom</option>
              </select>
              <p className="text-xs text-gray-500">Optional: Use this to group templates by activity.</p>
            </div>

            {/* Schedule */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Schedule (Cron Format)</label>
              <Input
                placeholder="e.g. 0 9 * * 1-5"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Optional. Example: <code className="bg-gray-100 p-0.5 rounded">0 9 * * 1-5</code> = 9 AM on weekdays.
              </p>
            </div>

            {/* Apps */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Apps to Launch</label>
              {apps.map((app, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g. code, postman"
                    value={app}
                    onChange={(e) => handleAppChange(index, e.target.value)}
                  />
                  {apps.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveApp(index)}
                      className="text-red-600"
                    >
                      ❌
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={handleAddApp} className="text-blue-600">
                ➕ Add App
              </Button>
              <p className="text-xs text-gray-500">Use app CLI names like <code>code</code>, <code>figma</code>, etc.</p>
            </div>

            {/* Websites */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Websites to Launch</label>
              {websites.map((site, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g. https://github.com"
                    value={site}
                    onChange={(e) => handleWebsiteChange(index, e.target.value)}
                  />
                  {websites.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveWebsite(index)}
                      className="text-red-600"
                    >
                      ❌
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={handleAddWebsite} className="text-blue-600">
                ➕ Add Website
              </Button>
              <p className="text-xs text-gray-500">Include <code>https://</code> prefix for proper opening.</p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {loading ? "Creating..." : "🚀 Create Template"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
