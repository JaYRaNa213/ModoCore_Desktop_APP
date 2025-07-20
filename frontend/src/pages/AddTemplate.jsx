








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
  // const [workspace, setWorkspace] = useState("");
  const [schedule, setSchedule] = useState("");
  const [showAppTips, setShowAppTips] = useState(false);
  const [showWebTips, setShowWebTips] = useState(false);
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
      // workspace: workspace.trim(),
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
          <h2 className="text-2xl font-bold mb-6 text-indigo-700">
            📝 Create New Work Template
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Template Title */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Template Title *
              </label>
              <Input
                placeholder="e.g. Design Mode"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                placeholder="Briefly describe what this template does"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            

            {/* Schedule */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Schedule (Cron Format)
              </label>
              <Input
                placeholder="e.g. 0 9 * * 1-5"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Optional:{" "}
                <code className="bg-gray-100 p-1 rounded">0 9 * * 1-5</code> =
                every weekday at 9 AM
              </p>
            </div>

            {/* Apps to Launch */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between items-center">
                Apps to Launch
                <button
                  type="button"
                  className="text-xs text-indigo-600 underline"
                  onClick={() => setShowAppTips(!showAppTips)}
                >
                  {showAppTips ? "Hide tips" : "ℹ️ How to add apps"}
                </button>
              </label>

              {apps.map((app, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g. code OR full path like C:\\Program Files\\App\\app.exe"
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

              <Button
                type="button"
                onClick={handleAddApp}
                className="text-blue-600"
              >
                ➕ Add App
              </Button>

              {showAppTips && (
                <div className="bg-gray-50 border text-xs text-gray-600 p-3 rounded mt-2">
                  <p>You can add apps using:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <strong>App name:</strong> <code>VsCode</code>,{" "}
                      <code>notepad</code>, <code>Postman</code>
                    </li>
                    <li>
                      <strong>Add Path Instruction:</strong>{" "}
                      <ol>
                        <li>1. Go to - C:\Program Files </li>
                        <li>2. open App Folder </li>
                           <li>3. Search (App Name) .exe </li>
                         <li>4. Copy Path With (App Name).exe </li>
                         

                         </ol>
                    </li>
                    <li>
                      <strong>Path Example:</strong>{" "}
                      <code>C:\Program Files\Postman\Postman.exe</code>
                    </li>
                    <li>
                      <strong>Shortcuts:</strong> Any command in your system
                      PATH
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Websites to Launch */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between items-center">
                Websites to Launch
                <button
                  type="button"
                  className="text-xs text-indigo-600 underline"
                  onClick={() => setShowWebTips(!showWebTips)}
                >
                  {showWebTips ? "Hide tips" : "ℹ️ How to add websites"}
                </button>
              </label>

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

              <Button
                type="button"
                onClick={handleAddWebsite}
                className="text-blue-600"
              >
                ➕ Add Website
              </Button>

              {showWebTips && (
                <div className="bg-gray-50 border text-xs text-gray-600 p-3 rounded mt-2">
                  <p>Make sure URLs:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Start with <code>http://</code> or <code>https://</code>
                    </li>
                    <li>
                      Examples:
                      <ul className="list-inside pl-3 space-y-0.5">
                        <li>
                          <code>https://github.com</code>
                        </li>
                        <li>
                          <code>http://amazon.in</code>
                        </li>
                        <li>
                          <code>https://youtube.com</code>
                        </li>
                        <li>
                          <code>http://localhost:3000</code>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {loading ? "Creating..." : " Create Template"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
