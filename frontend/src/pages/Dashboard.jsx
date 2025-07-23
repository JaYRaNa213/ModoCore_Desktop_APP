// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getTopTemplates } from "../services/TemplateService";
import {
  Plus,
  BookOpen,
  Bot,
  ShieldCheck,
  Flame,
  LayoutTemplate,
  TrendingUp,
  Users,
  Star,
  Eye,
  Download,
  Search,
  Filter,
  Zap,
  Settings,
  Play,
  Edit3,
  Sparkles,
  Award,
  Activity,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

const handleLaunch = async (id) => {
  try {
    await axios.post(`http://localhost:5000/api/templates/${id}/launch`);
    alert("✅ Template launched!");
  } catch (err) {
    console.error("🚨 Launch failed", err.response?.data || err.message);
    alert("❌ Launch failed: " + (err.response?.data?.details || err.message));
  }
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [topTemplates, setTopTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopTemplates = async () => {
      try {
        setIsLoading(true);
        const data = await getTopTemplates(6);
        if (Array.isArray(data)) {
          setTopTemplates(data);
        } else {
          setTopTemplates([]);
          console.warn("Expected array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching top templates:", error);
        setTopTemplates([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTemplates();
  }, []);

  const userTemplatesCount = topTemplates.length;
  const totalUsage = topTemplates.reduce((acc, template) => acc + (template.usageCount || 0), 0);

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
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                      Digital Workspace
                    </h1>
                    <p className="text-slate-400 text-sm">Switch your entire setup in 1 click</p>
                  </div>
                </div>
                <p className="text-lg text-slate-300 max-w-2xl">
                  Create, manage and launch your perfect productivity templates with ease.
                  Build your digital workspace that works for you.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-xl border border-purple-500/30 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">AI Enhanced</span>
                </div>
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  BETA v1.0.0
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Templates Count */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <Card className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-900/70 transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Your Templates</p>
                      <p className="text-3xl font-bold text-white mt-1">{userTemplatesCount}</p>
                      <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +12% this month
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <LayoutTemplate className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Total Usage */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <Card className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-900/70 transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Total Launches</p>
                      <p className="text-3xl font-bold text-white mt-1">{totalUsage}</p>
                      <p className="text-blue-400 text-sm mt-1 flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {Math.floor(totalUsage / 30)} per day avg
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Success Rate */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-green-600/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <Card className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-900/70 transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Success Rate</p>
                      <p className="text-3xl font-bold text-white mt-1">99.2%</p>
                      <p className="text-emerald-400 text-sm mt-1 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Excellent performance
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Star className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1 max-w-2xl">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button
                onClick={() => setFilterActive(!filterActive)}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap ${
                  filterActive 
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg" 
                    : "bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 text-white hover:bg-gray-900/70"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            
            <Link
              to="/add-template"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Add Template
            </Link>
          </div>

          {/* Templates Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-7 h-7 text-orange-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Templates</h2>
                  <p className="text-slate-400 text-sm">Manage and launch your workspace setups</p>
                </div>
              </div>
            </div>

            {/* Templates Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 animate-pulse">
                    <div className="w-12 h-12 bg-gray-700 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topTemplates.length > 0 ? (
                  topTemplates
                    .filter(template => 
                      template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      template.description?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((template, index) => (
                      <div key={template._id} className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <Card className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden hover:bg-gray-900/70 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                          <CardContent className="p-6 space-y-4">
                            {/* Template Header */}
                            <div className="flex items-center justify-between">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <BookOpen className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-amber-400">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="text-sm font-medium">4.8</span>
                                </div>
                                <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-600/30">
                                  Active
                                </span>
                              </div>
                            </div>

                            {/* Template Content */}
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                                {template.title || `Template ${index + 1}`}
                              </h3>
                              <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
                                {template.description || "A powerful template to boost your productivity and streamline your workflow with automated launches."}
                              </p>
                            </div>

                            {/* Template Stats */}
                            <div className="flex items-center justify-between text-sm pt-2">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-slate-400">
                                  <Eye className="w-4 h-4" />
                                  <span>{template.usageCount || Math.floor(Math.random() * 100) + 10}</span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-400">
                                  <Download className="w-4 h-4" />
                                  <span>{Math.floor((template.usageCount || 50) * 0.8)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-3">
                              <button 
                                onClick={() => handleLaunch(template._id)}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 group/btn"
                              >
                                <Play className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                                Launch
                              </button>
                              <button 
                                onClick={() => navigate(`/templates/edit/${template._id}`)}
                                className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl hover:bg-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group/edit"
                              >
                                <Edit3 className="w-4 h-4 group-hover/edit:rotate-12 transition-transform duration-300" />
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))
                ) : (
                  <div className="col-span-full">
                    <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl">
                      <CardContent className="p-12 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-70">
                          <LayoutTemplate className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No templates yet</h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                          Get started by creating your first template. Build your perfect productivity workspace in just one click.
                        </p>
                        <Link
                          to="/add-template"
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <Plus className="w-5 h-5" />
                          Create Your First Template
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/templates"
                className="group flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Browse Templates</p>
                  <p className="text-sm text-slate-400">Explore all templates</p>
                </div>
              </Link>

              <Link
                to="/automations"
                className="group flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Automations</p>
                  <p className="text-sm text-slate-400">Manage workflows</p>
                </div>
              </Link>

              <Link
                to="/settings"
                className="group flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Settings</p>
                  <p className="text-sm text-slate-400">Customize workspace</p>
                </div>
              </Link>
            </div>
          </div>
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