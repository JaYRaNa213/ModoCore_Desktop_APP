// Profile.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  FileText,
  Camera,
  Save,
  ArrowLeft,
  Settings,
  Shield,
  Bell,
  Palette,
  Globe,
  Edit3,
  Check,
  X,
  Star,
  Award,
  Target,
  Activity,
  Calendar,
  Clock,
  Zap,
  Crown,
  Sparkles,
} from "lucide-react";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "Jay Rana",
    email: "jayrana@example.com",
    bio: "Focused on productivity and building amazing workspace templates.",
    title: "Template Creator",
    location: "San Francisco, CA",
    website: "https://jayrana.dev",
    joinDate: "January 2024",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock stats data
  const stats = {
    templatesCreated: 12,
    totalLaunches: 245,
    avgRating: 4.8,
    daysActive: 127,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Updated Profile:", formData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = () => {
    toast.success("Avatar upload feature coming soon!");
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

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="flex items-center justify-center w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl transition-all duration-300 group"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    Profile Settings
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Manage your personal information and preferences
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="text-sm text-amber-300 font-medium">Pro Member</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300 sticky top-24">
                {/* Avatar Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-full p-1 shadow-2xl">
                      <img
                        src="https://api.dicebear.com/7.x/lorelei/svg?seed=Jay"
                        alt="Avatar"
                        className="w-full h-full rounded-full bg-gray-800 object-cover"
                      />
                    </div>
                    <button
                      onClick={handleAvatarChange}
                      className="absolute bottom-2 right-2 w-10 h-10 bg-purple-600 hover:bg-purple-700 border-4 border-black rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 group"
                    >
                      <Camera className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
                    <p className="text-purple-400 font-medium">{formData.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{formData.location}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-4 bg-purple-600/20 backdrop-blur-xl border border-purple-500/30 px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-300 font-medium">Verified Creator</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.templatesCreated}</p>
                    <p className="text-xs text-gray-400">Templates</p>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.totalLaunches}</p>
                    <p className="text-xs text-gray-400">Launches</p>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.daysActive}</p>
                    <p className="text-xs text-gray-400">Days Active</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    About
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {formData.bio}
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {formData.joinDate}</span>
                  </div>
                  {formData.website && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={formData.website} className="text-purple-400 hover:text-purple-300 transition-colors">
                        {formData.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Edit Profile Section */}
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Personal Information</h2>
                      <p className="text-sm text-gray-400">Update your personal details</p>
                    </div>
                  </div>
                  
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-600/30 text-purple-400 px-4 py-2 rounded-xl transition-all duration-300 group"
                    >
                      <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 bg-gray-600/20 hover:bg-gray-600/30 border border-gray-600/30 text-gray-400 px-3 py-2 rounded-xl transition-all duration-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 disabled:bg-gray-600/20 border border-green-600/30 disabled:border-gray-600/30 text-green-400 disabled:text-gray-400 px-3 py-2 rounded-xl transition-all duration-300"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="4"
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {isEditing && (
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-800/50">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed transition-all duration-300"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Settings Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preferences */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Preferences</h3>
                      <p className="text-sm text-gray-400">Customize your experience</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">Notifications</span>
                      </div>
                      <button className="w-12 h-6 bg-purple-600 rounded-full relative transition-colors">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">Dark Mode</span>
                      </div>
                      <button className="w-12 h-6 bg-purple-600 rounded-full relative transition-colors">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-900/70 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Security</h3>
                      <p className="text-sm text-gray-400">Keep your account safe</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-black/50 hover:bg-black/70 border border-gray-700/50 rounded-xl transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300 group-hover:text-white">Change Password</span>
                        <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </button>
                    
                    <button className="w-full text-left p-3 bg-black/50 hover:bg-black/70 border border-gray-700/50 rounded-xl transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300 group-hover:text-white">Two-Factor Auth</span>
                        <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
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
      `}</style>
    </div>
  );
}