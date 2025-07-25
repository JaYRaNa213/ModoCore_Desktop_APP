// AddTemplate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Plus,
  Minus,
  Save,
  ArrowLeft,
  Globe,
  Monitor,
  Clock,
  FileText,
  Sparkles,
  X,
  Check,
  Info,
  Zap,
  Target,
  Code,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";

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
    if (apps.length > 1) {
      const updated = apps.filter((_, i) => i !== index);
      setApps(updated);
    }
  };

  const handleRemoveWebsite = (index) => {
    if (websites.length > 1) {
      const updated = websites.filter((_, i) => i !== index);
      setWebsites(updated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filteredApps = apps.filter((a) => a.trim() !== "");
    const filteredWebsites = websites.filter((w) => w.trim() !== "");

    const newTemplate = {
      title: title.trim(),
      description: description.trim(),
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
      toast.success("Template created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating template:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300 group"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                    Create New Template
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Build your perfect productivity workspace
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-400">AI Enhanced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-white">Template Title *</label>
                  <p className="text-sm text-gray-400">Give your template a memorable name</p>
                </div>
              </div>
              <input
                type="text"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., Morning Productivity Setup, Coding Environment, Design Mode..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-white">Description</label>
                  <p className="text-sm text-gray-400">Explain what this template does</p>
                </div>
              </div>
              <textarea
                className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-h-[120px] resize-none"
                placeholder="Describe your template's purpose, what apps it opens, and how it helps your workflow..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Schedule Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-white">Schedule (Optional)</label>
                  <p className="text-sm text-gray-400">Cron format for automated launching</p>
                </div>
              </div>
              <input
                type="text"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g., 0 9 * * 1-5 (every weekday at 9 AM)"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
              <div className="mt-3 p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
                <p className="text-sm text-slate-400 mt-1">
  Example: <code>0 12 * * *</code> (daily at noon) &nbsp;
  <a
    href="https://crontab.guru"
    target="_blank"
    rel="noreferrer"
    className="underline text-blue-400"
  >
    Need help?
  </a>
</p>

              </div>
            </div>

            {/* Apps Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-white">Applications</label>
                    <p className="text-sm text-gray-400">Apps to launch with this template</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAppTips(!showAppTips)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 rounded-xl text-blue-400 text-sm transition-all duration-300"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {showAppTips ? "Hide Tips" : "Show Tips"}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddApp}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 rounded-xl text-green-400 font-medium transition-all duration-300 group"
                  >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    Add App
                  </button>
                </div>
              </div>
              
              {/* App Tips */}
              {showAppTips && (
                <div className="mb-6 p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl">
                  <h4 className="text-blue-300 font-medium mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    How to add apps:
                  </h4>
                  <div className="space-y-3 text-sm text-blue-200">
                    <div>
                      <p className="font-medium text-blue-100 mb-1">App name:</p>
                      <code className="bg-blue-600/20 px-2 py-1 rounded text-xs">VsCode</code>{" "}
                      <code className="bg-blue-600/20 px-2 py-1 rounded text-xs">notepad</code>{" "}
                      <code className="bg-blue-600/20 px-2 py-1 rounded text-xs">Postman</code>
                    </div>
                    <div>
                      <p className="font-medium text-blue-100 mb-2">Full path instructions:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li>Go to C:\Program Files</li>
                        <li>Open App Folder</li>
                        <li>Search (App Name).exe</li>
                        <li>Copy Path With (App Name).exe</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-medium text-blue-100 mb-1">Path example:</p>
                      <code className="bg-blue-600/20 px-2 py-1 rounded text-xs break-all">
                        C:\Program Files\Postman\Postman.exe
                      </code>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {apps.map((app, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., Visual Studio Code, Spotify, Chrome, or full path..."
                        value={app}
                        onChange={(e) => handleAppChange(index, e.target.value)}
                      />
                    </div>
                    {apps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveApp(index)}
                        className="flex items-center justify-center w-10 h-10 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 rounded-xl text-red-400 transition-all duration-300 group"
                      >
                        <Minus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Websites Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-white">Websites</label>
                    <p className="text-sm text-gray-400">URLs to open with this template</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWebTips(!showWebTips)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 rounded-xl text-blue-400 text-sm transition-all duration-300"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {showWebTips ? "Hide Tips" : "Show Tips"}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddWebsite}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-600/30 rounded-xl text-orange-400 font-medium transition-all duration-300 group"
                  >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    Add Website
                  </button>
                </div>
              </div>
              
              {/* Website Tips */}
              {showWebTips && (
                <div className="mb-6 p-4 bg-orange-600/10 border border-orange-600/20 rounded-xl">
                  <h4 className="text-orange-300 font-medium mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Website URL guidelines:
                  </h4>
                  <div className="space-y-3 text-sm text-orange-200">
                    <div>
                      <p className="font-medium text-orange-100 mb-1">Must start with:</p>
                      <div className="flex gap-2">
                        <code className="bg-orange-600/20 px-2 py-1 rounded text-xs">http://</code>
                        <span className="text-orange-300">or</span>
                        <code className="bg-orange-600/20 px-2 py-1 rounded text-xs">https://</code>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-orange-100 mb-2">Examples:</p>
                      <div className="space-y-1">
                        <code className="block bg-orange-600/20 px-2 py-1 rounded text-xs">https://github.com</code>
                        <code className="block bg-orange-600/20 px-2 py-1 rounded text-xs">https://youtube.com</code>
                        <code className="block bg-orange-600/20 px-2 py-1 rounded text-xs">http://localhost:3000</code>
                        <code className="block bg-orange-600/20 px-2 py-1 rounded text-xs">https://amazon.in</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {websites.map((site, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., https://github.com, https://stackoverflow.com..."
                        value={site}
                        onChange={(e) => handleWebsiteChange(index, e.target.value)}
                      />
                    </div>
                    {websites.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveWebsite(index)}
                        className="flex items-center justify-center w-10 h-10 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 rounded-xl text-red-400 transition-all duration-300 group"
                      >
                        <Minus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed transition-all duration-300 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Template...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Create Template</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Validation Info */}
            {(!title.trim() || (apps.filter(a => a.trim()).length === 0 && websites.filter(w => w.trim()).length === 0)) && (
              <div className="bg-amber-600/10 border border-amber-600/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div className="text-sm text-amber-200">
                    <p className="font-medium mb-1">Required fields:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {!title.trim() && <li>Template title is required</li>}
                      {apps.filter(a => a.trim()).length === 0 && websites.filter(w => w.trim()).length === 0 && (
                        <li>Add at least one app or website</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
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