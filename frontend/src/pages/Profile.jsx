import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth} from "../auth/AuthContext";
import {
  User, Mail, FileText, Camera, Save, ArrowLeft, Settings, Shield, Bell,
  Palette, Globe, Edit3, Check, X, Star, Award, Target, Activity, Calendar,
  Zap, Crown, Sparkles
} from "lucide-react";

export default function Profile() {
  const auth = useAuth(); // ✅ safer
  const user = auth?.user; // optional chaining avoids crash // Get user from context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    title: "",
    location: "",
    website: "",
    joinDate: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "Guest User",
        email: user.email || "guest@example.com",
        bio: user.bio || "No bio available.",
        title: user.title || "User",
        location: user.location || "Unknown",
        website: user.website || "",
        joinDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
          : "N/A"
      });
    }
  }, [user]);

  const stats = {
    templatesCreated: user?.templates?.length || 0,
    totalLaunches: user?.launches || 0,
    avgRating: user?.rating || 4.5,
    daysActive: user?.daysActive || 0
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1200)); // simulate update
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = () => {
    toast.success("Avatar upload feature coming soon!");
  };

  const isGuest = user?.guest;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <div className="bg-black/50 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="w-10 h-10 bg-gray-800/50 border rounded-xl flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
                <p className="text-sm text-gray-400">Manage your profile</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-amber-300">Pro Member</span>
            </div>
          </div>
        </div>

        {/* Main content (ProfileCard + Form) */}
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar + Stats Card */}
          <div className="bg-gray-900/50 border border-gray-800/50 p-6 rounded-2xl backdrop-blur-xl sticky top-24">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user?.name || "Guest"}`}
                  className="w-32 h-32 rounded-full bg-gray-800"
                  alt="Avatar"
                />
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-purple-600 hover:bg-purple-700 border-4 border-black rounded-full flex items-center justify-center"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white mt-4">{formData.name}</h2>
              <p className="text-purple-400">{formData.title}</p>
              <p className="text-gray-400 text-sm">{formData.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { icon: Target, label: "Templates", value: stats.templatesCreated },
                { icon: Zap, label: "Launches", value: stats.totalLaunches },
                { icon: Star, label: "Rating", value: stats.avgRating },
                { icon: Activity, label: "Days Active", value: stats.daysActive }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-black/50 p-4 rounded-xl border border-gray-800/50 text-center">
                  <Icon className="w-5 h-5 mx-auto text-white mb-1" />
                  <p className="text-white font-bold">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/50 border border-gray-800/50 p-6 rounded-2xl backdrop-blur-xl">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Personal Info</h2>
                {!isGuest && !isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-purple-400 border border-purple-400 px-4 py-2 rounded-xl"
                  >
                    <Edit3 className="w-4 h-4 inline mr-2" />
                    Edit
                  </button>
                ) : null}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", name: "name", icon: User },
                    { label: "Email", name: "email", icon: Mail },
                    { label: "Title", name: "title", icon: Award },
                    { label: "Website", name: "website", icon: Globe }
                  ].map(({ label, name, icon: Icon }) => (
                    <div key={name}>
                      <label className="block text-sm text-gray-300 mb-1 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {label}
                      </label>
                      <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-xl bg-black/50 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                      />
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div>
                  <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-xl bg-black/50 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  />
                </div>

                {/* Save + Cancel */}
                {isEditing && (
                  <div className="flex justify-end gap-4 pt-4 border-t border-gray-800/50">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center gap-2"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
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
