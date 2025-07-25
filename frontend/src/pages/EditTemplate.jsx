// src/pages/EditTemplate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getTemplateById, updateTemplate } from "../services/TemplateService";
import {
  LoaderCircle,
  ArrowLeft,
  Edit3,
  AlertTriangle,
  Clock,
  Target,
  Save,
  X,
  Plus,
  Monitor,
  Globe
} from "lucide-react";

export default function EditTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [apps, setApps] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [schedule, setSchedule] = useState("");

  // Input states
  const [newApp, setNewApp] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      toast.error("Invalid template ID");
      return;
    }

    getTemplateById(id)
      .then((data) => {
        setTemplate(data);
        setTitle(data.title);
        setDescription(data.description);
        setApps(data.apps || []);
        setWebsites(data.websites || []);
        setSchedule(data.schedule || "");
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
        toast.error("Template not found.");
      });
  }, [id]);

  const handleAddApp = () => {
    if (!newApp.trim()) {
      toast.error("Please enter an application path");
      return;
    }
    if (apps.includes(newApp)) {
      toast.error("Application already added");
      return;
    }
    setApps([...apps, newApp]);
    setNewApp("");
    toast.success("Application added successfully!");
  };

  const handleAddWebsite = () => {
    if (!newWebsite.trim()) {
      toast.error("Please enter a website URL");
      return;
    }
    if (websites.includes(newWebsite)) {
      toast.error("Website already added");
      return;
    }
    setWebsites([...websites, newWebsite]);
    setNewWebsite("");
    toast.success("Website added successfully!");
  };

  const removeApp = (appToRemove) => {
    setApps(apps.filter(app => app !== appToRemove));
    toast.success("Application removed");
  };

  const removeWebsite = (websiteToRemove) => {
    setWebsites(websites.filter(website => website !== websiteToRemove));
    toast.success("Website removed");
  };

  const handleSave = async () => {
    const updated = {
      title,
      description,
      apps,
      websites,
      schedule: schedule || null,
    };
    try {
      await updateTemplate(id, updated);
      toast.success("Template updated successfully!");
      navigate("/templates");
    } catch (err) {
      toast.error("Failed to update template");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <LoaderCircle className="w-8 h-8 animate-spin text-purple-400" />
        <span className="ml-3 text-lg">Loading template...</span>
      </div>
    );
  }

  if (notFound || !template) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border border-red-500 text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Template Not Found</h2>
          <p className="text-gray-400 mb-4">It seems this template doesn't exist or has been deleted.</p>
          <button
            onClick={() => navigate("/templates")}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <div className="sticky top-0 z-20 bg-black/50 backdrop-blur-md border-b border-gray-800 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/templates")}
                className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl flex items-center justify-center transition backdrop-blur-xl"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Edit Template</h1>
                <p className="text-sm text-gray-400">Modify your workspace template settings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 bg-gray-800/50 backdrop-blur-xl px-4 py-2 rounded-xl border border-gray-700/50">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white">{template.title}</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Last modified</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-yellow-800/20 px-4 py-2 border border-yellow-600/40 rounded-xl backdrop-blur-xl">
                <Edit3 className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-300 font-medium">Edit Mode</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Template Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg"
              placeholder="Enter template title..."
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg resize-none"
              placeholder="Describe your template..."
            />
          </div>

          {/* Applications Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Applications</label>
            
            {/* Add App Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Monitor className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  value={newApp}
                  onChange={(e) => setNewApp(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddApp()}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg"
                  placeholder="C:\Program Files\YourApp\app.exe"
                />
              </div>
              <button
                onClick={handleAddApp}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add App
              </button>
            </div>

            {/* Apps List */}
            {apps.length > 0 && (
              <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Added Applications ({apps.length})</h4>
                <div className="space-y-2">
                  {apps.map((app, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-700/30 border border-gray-600/30 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Monitor className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-sm text-white truncate">{app}</span>
                      </div>
                      <button
                        onClick={() => removeApp(app)}
                        className="ml-3 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Websites Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Websites</label>
            
            {/* Add Website Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                <input
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddWebsite()}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 shadow-lg"
                  placeholder="https://example.com"
                />
              </div>
              <button
                onClick={handleAddWebsite}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Website
              </button>
            </div>

            {/* Websites List */}
            {websites.length > 0 && (
              <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/30 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Added Websites ({websites.length})</h4>
                <div className="space-y-2">
                  {websites.map((website, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-700/30 border border-gray-600/30 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Globe className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-white truncate">{website}</span>
                      </div>
                      <button
                        onClick={() => removeWebsite(website)}
                        className="ml-3 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Schedule Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Schedule (Cron Expression)</label>
            <input
              type="text"
              placeholder="e.g. 0 9 * * * (every day at 9 AM)"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg font-mono"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <style >{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}