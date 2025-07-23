// src/pages/Settings.jsx
import { useState } from "react";
import { Settings as SettingsIcon, Bell, Moon, User2 } from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState("Jay Rana");

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon size={28} className="text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">⚙️ Settings</h1>
      </div>

      {/* Profile Settings */}
      <div className="bg-white border shadow-sm rounded-xl p-6 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <User2 size={20} /> Profile
        </h2>
        <label className="block">
          <span className="text-gray-600 text-sm">Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </label>
      </div>

      {/* Preferences */}
      <div className="bg-white border shadow-sm rounded-xl p-6 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <Moon size={20} /> Appearance
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
              darkMode ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-white shadow transition transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border shadow-sm rounded-xl p-6 space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <Bell size={20} /> Notifications
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5 text-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}
