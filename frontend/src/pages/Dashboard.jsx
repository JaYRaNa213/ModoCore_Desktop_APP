// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getTopTemplates } from "../services/TemplateService";
import { getGuestTemplates } from "../utils/guestTemplates";
import { doLaunch } from "../utils/guestTemplates";
import { purgeOldGuestTemplates } from "../utils/guestTemplates";
import { useAuth } from "../auth/AuthContext";


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
  Target,
  Rocket,
  Clock,
  
  BarChart3,
} from "lucide-react";
// import { StatCard } from "../components/StatCard";
import { Card, CardContent } from "../components/ui/Card";
import StatCard from "./StatCard";
import { useNavigate } from "react-router-dom";



export default function Dashboard() {
  const navigate = useNavigate();

  const [topTemplates, setTopTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const freshTemplates = purgeOldGuestTemplates();


  const { user } = useAuth(); // 👈 get current user

  
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

useEffect(() => {
 if (!user) purgeOldGuestTemplates();
  const fetchTopTemplates = async () => {
    setIsLoading(true);
    try {
      let data = [];

      if (user) {
        // Logged-in: get top from backend
        const backendData = await getTopTemplates(6);
        data = Array.isArray(backendData) ? backendData : [];
      } else {
        // Guest: get from localStorage
        const guestTemplates = getGuestTemplates();
        data = guestTemplates.sort((a, b) => {
          const aTime = new Date(a.createdAt).getTime();
          const bTime = new Date(b.createdAt).getTime();
          return bTime - aTime; // latest first
        }).slice(0, 3); // take top 3
      }

      setTopTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTopTemplates([]);
    } finally {
      setIsLoading(false);
    }
  };

  fetchTopTemplates();
}, [user]);


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
                    <p className="text-slate-400 text-sm">
                      Switch your entire setup in 1 click
                    </p>
                  </div>
                </div>
                <p className="text-lg text-slate-300 max-w-2xl">
                  Create, manage and launch your perfect productivity templates
                  with ease. Build your digital workspace that works for you.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-xl border border-purple-500/30 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">
                    AI Enhanced
                  </span>
                </div>
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  BETA v1.0.0
                </span>
              </div>
            </div>
          </div>
        </div>




<div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Templates Count */}
        {/* <StatCard
          title="Your Templates"
          value={userTemplatesCount}
          color="purple"
          changeText="+12% this month"
          icon={<LayoutTemplate className="w-7 h-7 text-white" />}
          iconBg="from-purple-600 to-indigo-600"
          textColor="text-green-600"
          trendIcon={<TrendingUp className="w-3 h-3" />}
        /> */}

        {/* Total Usage */}
        {/* <StatCard
          title="Total Launches"
          value={totalUsage}
          changeText={`${Math.floor(totalUsage / 30)} per day avg`}
          color="blue"
          icon={<Zap className="w-7 h-7 text-white" />}
          iconBg="from-blue-600 to-cyan-600"
          textColor="text-blue-600"
          trendIcon={<Activity className="w-3 h-3" />}
        /> */}

        {/* Success Rate */}
        {/* <StatCard
          title="Success Rate"
          value="99.2%"
          changeText="Excellent performance"
          color="emerald"
          icon={<Star className="w-7 h-7 text-white" />}
          iconBg="from-emerald-600 to-green-600"
          textColor="text-emerald-600"
          trendIcon={<Award className="w-3 h-3" />}
        /> */}
      </div>

      {/* Search and Actions */}
     <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
  {/* Search + Filter */}
  <div className="flex flex-col sm:flex-row gap-4 items-center flex-1 max-w-2xl">
    <div className="relative flex-1 w-full">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search your templates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-4 bg-neutral-900 border border-neutral-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-md"
      />
    </div>

    <button
      onClick={() => setFilterActive(!filterActive)}
      className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap shadow-md ${
        filterActive
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
          : "bg-neutral-900 border border-neutral-700 text-gray-300 hover:bg-neutral-800"
      }`}
    >
      <Filter className="w-4 h-4" />
      Filter
    </button>
  </div>

  {/* Add Template Button */}
  <Link
    to="/add-template"
    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
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
                  <h2 className="text-2xl font-bold text-white">
                    Your Templates
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Manage and launch your workspace setups
                  </p>
                </div>
              </div>
              <Link
                to="/templates"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 flex items-center gap-2"
              >
                View All
                <Eye className="w-4 h-4" />
              </Link>
            </div>

            {/* Templates Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 animate-pulse shadow-xl"
                  >
                    <div className="w-12 h-12 bg-gray-300 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-10 bg-gray-300 rounded flex-1"></div>
                      <div className="h-10 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topTemplates.length > 0 ? (

                  topTemplates
  .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0)) // Most used first
  .filter(
    (template) =>
      template.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .slice(0, 3) // Show only top 3
  .map((template, index) => (


                      <div
                        key={template._id || index}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>





{/* ////////////////////////////////////////////////////////// */}



                        <Card className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-neutral-700 shadow-lg">

  <CardContent className="p-6 space-y-4">
    {/* Template Header */}
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-700 via-indigo-700 to-black rounded-xl flex items-center justify-center shadow-lg">
        <Target className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors truncate">
          {template.title}
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="font-medium">4.8</span>
          </div>
          <span className="px-2 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-medium">
            Active
          </span>
        </div>
      </div>
    </div>

    {/* Template Description */}
    <p className="text-neutral-300 text-sm leading-relaxed line-clamp-2">
      {template.description ||
        "A powerful template to boost your productivity and streamline your workflow."}
    </p>

    {/* Template Stats */}
    <div className="grid grid-cols-2 gap-4 py-3 border-t border-neutral-700">
      <div className="flex items-center gap-2 text-sm">
        <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Usage</p>
          <p className="text-white font-semibold">{template.usageCount || 0}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-purple-300" />
        </div>
        <div>
          <p className="text-neutral-400 text-xs">Last used</p>
          <p className="text-white font-semibold text-xs">2 days ago</p>
        </div>
      </div>
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

     <Link to={`/template/${template._id}`} 
        className="px-4 py-3 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-neutral-200 rounded-xl transition-all duration-300 group/view"
      >
        <Eye className="w-4 h-4 group-hover/view:scale-110 transition-transform duration-300" />
      </Link>

      <Link to={`/templates/edit/${template._id}`} 
        className="px-4 py-3 bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 text-neutral-200 rounded-xl transition-all duration-300 group/edit"
      >
        <Edit3 className="w-4 h-4 group-hover/edit:scale-110 transition-transform duration-300" />
      </Link>
    </div>
  </CardContent>
</Card>

                      </div>
                    ))
                ) : (
                  <div className="col-span-full">
                    <Card className="bg-white rounded-2xl p-12 text-center shadow-xl">
                      <CardContent>
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-70">
                          <LayoutTemplate className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          No templates yet
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                          Get started by creating your first template. Build
                          your perfect productivity workspace.
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
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Link
    to="/templates"
    className="group relative bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
      <LayoutTemplate className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
      All Templates
    </h3>
    <p className="text-gray-400 text-sm">
      View and manage all your templates
    </p>
  </Link>

  <Link
    to="/analytics"
    className="group relative bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
      <BarChart3 className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
      Analytics
    </h3>
    <p className="text-gray-400 text-sm">
      Track usage and performance
    </p>
  </Link>

  <Link
    to="/automations"
    className="group relative bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
      <Bot className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
      Automations
    </h3>
    <p className="text-gray-400 text-sm">Set up automatic launches</p>
  </Link>

  <Link
    to="/settings"
    className="group relative bg-[#1f1f1f] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
      <Settings className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
      Settings
    </h3>
    <p className="text-gray-400 text-sm">
      Customize your preferences
    </p>
  </Link>
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