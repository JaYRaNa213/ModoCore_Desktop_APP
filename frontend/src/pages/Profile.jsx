import { useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "Jay Rana",
    email: "jayrana@example.com",
    bio: "Focused on productivity .",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">👤 Profile</h1>
        <span className="text-sm text-gray-400">Manage your personal details</span>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border max-w-2xl space-y-5"
      >
        {/* Avatar Upload */}
        <div className="flex items-center gap-4">
          <img
            src="https://api.dicebear.com/7.x/lorelei/svg?seed=Jay"
            alt="Avatar"
            className="w-16 h-16 rounded-full border"
          />
          <button
            type="button"
            className="text-sm text-indigo-600 font-medium hover:underline"
          >
            Change Avatar
          </button>
        </div>

        {/* Input Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
