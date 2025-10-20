// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const avatarOptions = [
  "/pictures/11.jpg",
  "/pictures/12.jpg",
  "/pictures/123.jpg",
  "/pictures/1234.jpg",
  "/pictures/Attack.jpg",
  
  "/pictures/demonslayer.jpg",
  "/pictures/fffu.jpg",
  "/pictures/gddgsh.jpg",
  "/pictures/gojo1.jpg",
  "/pictures/gojo2.jpg",
  "/pictures/jayay.jpg",
  "/pictures/levi.jpg",
  "/pictures/onepiece.jpg",
  "/pictures/Tanjiro.jpg",
  "/pictures/toji.jpg",
  
  "/pictures/dada.jpg",
  "/pictures/girl1.jpg",
  "/pictures/girl2.jpg",
  "/pictures/girl3.jpg",
  "/pictures/girl4.jpg",
  "/pictures/girl5.jpg",
  "/pictures/girl6.jpg"


];

export default function Profile() {
  const { user, login } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [profile, setProfile] = useState({ username: "Guest User", email: "" });

  useEffect(() => {
    if (user) {
      setProfile({ username: user.username, email: user.email });
    }
  }, [user]);

  const handleSelectAvatar = (url) => {
    setSelectedAvatar(url);

    if (user) {
      login({ ...user, profileImage: url }, localStorage.getItem("token"));
      toast.success("Avatar selected!");
    } else {
      toast.success("Avatar selected!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
        <Link to="/" className="text-gray-400 hover:text-white inline-flex gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

        {/* Profile Card */}
        <div className="bg-neutral-800 rounded-xl p-6 flex items-center gap-8">
          {/* Left: Rectangular Image */}
          <div className="flex-shrink-0 w-40 h-50 overflow-hidden rounded-lg">
            <img
              src={selectedAvatar}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: User info */}
          <div className="flex-1">
            <p className="text-2xl font-semibold">{profile.username}</p>
            <p className="text-gray-400 text-sm mt-1">
              {profile.email || "Not logged in"}
            </p>
          </div>
        </div>

        <h3 className="text-lg mt-6">Choose your avatar</h3>
        <div className="grid grid-cols-6 gap-4">
          {avatarOptions.map((url) => (
            <button
              key={url}
              onClick={() => handleSelectAvatar(url)}
              className={`p-1 rounded-xl border overflow-hidden ${
                selectedAvatar === url
                  ? "border-purple-500"
                  : "border-gray-700"
              }`}
            >
              <img
                src={url}
                className="w-full h-20 object-cover rounded-lg"
                alt="avatar option"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
