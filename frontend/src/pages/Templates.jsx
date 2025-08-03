// Templates.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Rocket,
  Trash2,
  Timer,
  BarChart,
  Eye,
  Plus,
  Pencil,
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Clock,
  Activity,
  Zap,
  Settings,
  ArrowLeft,
  Sparkles,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Globe,
  Monitor,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { doLaunch } from "../utils/guestTemplates";
import { getGuestTemplates,saveGuestTemplates } from "../utils/guestTemplates";
import { purgeOldGuestTemplates } from "../utils/guestTemplates";

import { deleteGuestTemplate } from "../utils/guestTemplates"; 


export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { user } = useAuth(); 
  

  useEffect(() => {
  const fetchTemplates = async () => {
    setIsLoading(true);

    try {
      if (user) {
        // Logged in: fetch from backend
        const response = await axios.get("http://localhost:5000/api/templates");
        setTemplates(response.data);
      } else {
        // Guest: fetch from localStorage
        const guestTemplates = getGuestTemplates();
        setTemplates(guestTemplates);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("Failed to load templates");
    } finally {
      setIsLoading(false);
    }
  };

  fetchTemplates();
}, [user]);


  
  const handleLaunch = async (template) => {
  try {
    const hasApps = Array.isArray(template.apps) && template.apps.length > 0;
    const hasWebsites = Array.isArray(template.websites) && template.websites.length > 0;

    if (!hasApps && !hasWebsites) {
      alert("⚠️ This template has no apps or websites to launch.");
      return;
    }

    if (user && template._id) {
      // Logged-in user: call backend launch
      await axios.post(`http://localhost:5000/api/templates/${template._id}/launch`);
      alert("✅ Template launched!");
    } else {
      // Guest user: launch directly from local template
      await doLaunch(template); // Safe now even if only apps/websites present
      alert("✅ Guest template launched!");
    }
  } catch (err) {
    console.error("🚨 Launch failed", err.response?.data || err.message);
    alert("❌ Launch failed: " + (err.response?.data?.details || err.message));
  }
};


const handleDelete = async (id, title) => {
  if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

  try {
    if (user) {
      const token = localStorage.getItem("contextswap-token");
      const res = await axios.delete(`http://localhost:5000/api/templates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Deleted from server:", res.data);
      toast.success("Template deleted successfully");
    } else {
      deleteGuestTemplate(id);
      toast.success("Template deleted locally");
    }

    // ✅ Fix: Handle both MongoDB (_id) and guest (id)
    setTemplates(prev =>
      prev.filter(template => template._id !== id && template.id !== id)
    );
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
    toast.error("Failed to delete template");
  }
};




  const filteredTemplates = templates.filter(template =>
    template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsage = templates.reduce((acc, template) => acc + (template.usageCount || 0), 0);
  const averageUsage = templates.length > 0 ? Math.round(totalUsage / templates.length) : 0;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="flex items-center justify-center w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300 group"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    Your Templates
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">
                    Manage and organize your workspace templates
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-purple-600/20 backdrop-blur-xl border border-purple-500/30 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">{templates.length} Templates</span>
                </div>
                <Link
                  to="/add-template"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Add New Template
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Total Templates</p>
                  <p className="text-2xl font-bold text-white mt-1">{templates.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Total Launches</p>
                  <p className="text-2xl font-bold text-white mt-1">{totalUsage}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Average Usage</p>
                  <p className="text-2xl font-bold text-white mt-1">{averageUsage}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold text-white mt-1">98%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1 max-w-2xl">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterActive(!filterActive)}
                  className={`flex items-center gap-2 px-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    filterActive 
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg" 
                      : "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 text-white hover:bg-gray-900/70"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === "grid" 
                    ? "bg-purple-600 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === "list" 
                    ? "bg-purple-600 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>
          </div>

          {/* Templates Grid/List */}
          {isLoading ? (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-10 bg-gray-700 rounded flex-1"></div>
                    <div className="h-10 bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-70">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchTerm ? "No templates found" : "No templates yet"}
              </h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? `No templates match "${searchTerm}". Try a different search term.`
                  : "Get started by creating your first template. Build your perfect productivity workspace."
                }
              </p>
              {!searchTerm && (
                <Link
                  to="/add-template"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Template
                </Link>
              )}
            </div>
          ) : (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
              {filteredTemplates.map((template) => (
                <div key={template._id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  
                  <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-900/70 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                    {/* Edit Button */}
                    <Link
                      to={`/templates/edit/${template._id}`}
                      className="absolute top-4 right-4 z-10 w-10 h-10 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/30 rounded-xl flex items-center justify-center text-amber-400 hover:text-amber-300 transition-all duration-300 group/edit"
                      title="Edit Template"
                    >
                      <Pencil className="w-4 h-4 group-hover/edit:rotate-12 transition-transform duration-300" />
                    </Link>

                    <div className="p-6 space-y-4">
                      {/* Template Header */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                            {template.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1 text-amber-400">
                              <Star className="w-3 h-3 fill-current" />
                              <span>4.8</span>
                            </div>
                            <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-600/30">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Template Description */}
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                        {template.description || "A powerful template to boost your productivity and streamline your workflow."}
                      </p>

                      {/* Template Stats */}
                      <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-800/50">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <BarChart className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">Usage</p>
                            <p className="text-white font-semibold">{template.usageCount || 0}</p>
                          </div>
                        </div>
                        
                        {template.schedule && (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-slate-400 text-xs">Scheduled</p>
                              <p className="text-white font-semibold text-xs truncate">{template.schedule}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Apps and Websites Preview */}
                      <div className="space-y-2">
                        {template.apps && template.apps.length > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <Monitor className="w-4 h-4 text-green-400" />
                            <span className="text-slate-400">
                              {template.apps.length} app{template.apps.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                        {template.websites && template.websites.length > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="w-4 h-4 text-orange-400" />
                            <span className="text-slate-400">
                              {template.websites.length} website{template.websites.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button
        onClick={() => handleLaunch(template)}
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 group/launch shadow-lg"
      >
        <Rocket className="w-4 h-4 group-hover/launch:scale-110 transition-transform duration-300" />
        Launch
      </button>

                        <Link
                          to={`/template/${template._id}`}
                          className="px-4 py-3 bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-xl hover:bg-blue-600/30 hover:border-blue-600/50 transition-all duration-300 group/view"
                        >
                          <Eye className="w-4 h-4 group-hover/view:scale-110 transition-transform duration-300" />
                        </Link>

                        <button
                          onClick={() => handleDelete(template._id, template.title)}
                          className="px-4 py-3 bg-red-600/20 border border-red-600/30 text-red-400 rounded-xl hover:bg-red-600/30 hover:border-red-600/50 transition-all duration-300 group/delete"
                        >
                          <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}