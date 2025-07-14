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

    const newTemplate = {
      title: title.trim(),
      description: description.trim(),
      apps: apps.filter((a) => a.trim() !== ""),
      websites: websites.filter((w) => w.trim() !== "")
    };

    try {
      if (!newTemplate.title || !newTemplate.apps.length) {
        toast.error("Template must have a title and at least one app.");
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Template Title</label>
              <Input
                placeholder="e.g. Focus Mode"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                placeholder="Briefly describe what this template does..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Apps to Launch</label>
              {apps.map((app, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g. code, postman, figma"
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
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Websites to Launch</label>
              {websites.map((site, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g. https://chat.openai.com"
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
            </div>

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
