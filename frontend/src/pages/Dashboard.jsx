




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
} from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";


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
  const [topTemplates, setTopTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const fetchTopTemplates = async () => {
      try {
        const data = await getTopTemplates(6); // Get more templates for better showcase
        if (Array.isArray(data)) {
          setTopTemplates(data);
        } else {
          setTopTemplates([]);
          console.warn("Expected array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching top templates:", error);
        setTopTemplates([]);
      }
    };

    fetchTopTemplates();
  }, []);

  // Mock user templates data - replace with actual user data
  const userTemplatesCount = topTemplates.length;
  const totalUsage = topTemplates.reduce((acc, template) => acc + (template.usageCount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 p-6 space-y-8 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Switch your entire{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                digital workspace
              </span>{" "}
              in 1 click
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Create, manage and launch your perfect productivity templates with ease. 
              Build your digital workspace that works for you.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              BETA v1.0.0
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Templates Count */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <Card className="relative bg-white/10 backdrop-blur-md border-white/20 rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <LayoutTemplate className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{userTemplatesCount}</h3>
                <p className="text-gray-300 text-sm">Your Templates</p>
              </CardContent>
            </Card>
          </div>

          {/* Total Usage */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <Card className="relative bg-white/10 backdrop-blur-md border-white/20 rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{totalUsage}</h3>
                <p className="text-gray-300 text-sm">Total Usage</p>
              </CardContent>
            </Card>
          </div>

          {/* Success Rate */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <Card className="relative bg-white/10 backdrop-blur-md border-white/20 rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">100%</h3>
                <p className="text-gray-300 text-sm">Success Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilterActive(!filterActive)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                filterActive 
                  ? "bg-purple-600 text-white shadow-lg" 
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Your Templates Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-400" />
              Your Templates
            </h2>
            <Link
              to="/add-template"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add Template
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTemplates.length > 0 ? (
              topTemplates
                .filter(template => 
                  template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  template.description?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((template, index) => (
                  <div key={template._id} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                      <CardContent className="p-6 space-y-4">
                        {/* Template Header */}
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">4.8</span>
                          </div>
                        </div>

                        {/* Template Content */}
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {template.title || `Template ${index + 1}`}
                          </h3>
                          <p className="text-gray-300 text-sm line-clamp-2">
                            {template.description || "A powerful template to boost your productivity and streamline your workflow."}
                          </p>
                        </div>

                        {/* Template Stats */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-gray-400">
                              <Eye className="w-4 h-4" />
                              <span>{template.usageCount || Math.floor(Math.random() * 100) + 10}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400">
                              <Download className="w-4 h-4" />
                              <span>{Math.floor((template.usageCount || 50) * 0.8)}</span>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded-lg text-xs font-medium">
                            Active
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <button onClick={() => handleLaunch(template._id)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                            Launch
                          </button>
                          <button className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
                            Edit
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
            ) : (
              <div className="col-span-full">
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                      <LayoutTemplate className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No templates yet</h3>
                    <p className="text-gray-300 mb-6 max-w-md mx-auto">
                      Get started by creating your first template. Build your perfect productivity workspace in just one click.
                    </p>
                    <Link
                      to="/templates/add"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Plus className="w-5 h-5" />
                      Create Your First Template
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 pt-8">
          <Link
            to="/templates"
            className="group relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            Browse Templates
          </Link>

          <Link
            to="/automations"
            className="group relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <Bot className="w-5 h-5" />
            Automations
          </Link>

          <Link
            to="/admin"
            className="group relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <ShieldCheck className="w-5 h-5" />
            Settings
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
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
