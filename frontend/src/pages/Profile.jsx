// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
const avatarOptions = [
  import.meta.env.BASE_URL + "pictures/11.jpg",
  import.meta.env.BASE_URL + "pictures/12.jpg",
  import.meta.env.BASE_URL + "pictures/123.jpg",
  import.meta.env.BASE_URL + "pictures/1234.jpg",
  import.meta.env.BASE_URL + "pictures/Attack.jpg",
  import.meta.env.BASE_URL + "pictures/demonslayer.jpg",
  import.meta.env.BASE_URL + "pictures/fffu.jpg",
  import.meta.env.BASE_URL + "pictures/gddgsh.jpg",
  import.meta.env.BASE_URL + "pictures/gojo1.jpg",
  import.meta.env.BASE_URL + "pictures/gojo2.jpg",
  import.meta.env.BASE_URL + "pictures/jayay.jpg",
  import.meta.env.BASE_URL + "pictures/levi.jpg",
  import.meta.env.BASE_URL + "pictures/onepiece.jpg",
  import.meta.env.BASE_URL + "pictures/Tanjiro.jpg",
  import.meta.env.BASE_URL + "pictures/toji.jpg",
  import.meta.env.BASE_URL + "pictures/dada.jpg",
  import.meta.env.BASE_URL + "pictures/girl1.jpg",
  import.meta.env.BASE_URL + "pictures/girl2.jpg",
  import.meta.env.BASE_URL + "pictures/girl3.jpg",
  import.meta.env.BASE_URL + "pictures/girl4.jpg",
  import.meta.env.BASE_URL + "pictures/girl5.jpg",
  import.meta.env.BASE_URL + "pictures/girl6.jpg"
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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-gray-900 text-white py-10">
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        {/* Back Link */}
        <Link
          to="/"
          className="text-gray-400 hover:text-white inline-flex items-center gap-2 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to dashboard
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center md:text-left">Your Profile</h1>

        {/* Profile Card */}
        <div className="bg-neutral-800 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 transition-transform transform hover:scale-105 duration-300">
          {/* Left: Rectangular Image */}
          <div className="flex-shrink-0 w-40 h-56 md:w-48 md:h-60 overflow-hidden rounded-xl border-4 border-purple-500 shadow-lg">
            <img
              src={selectedAvatar}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: User Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <p className="text-3xl font-semibold">{profile.username}</p>
            <p className="text-gray-400 text-base">{profile.email || "Not logged in"}</p>
            <p className="text-gray-400 text-sm mt-2">
              Select your avatar below to personalize your profile
            </p>
          </div>
        </div>

        {/* Avatar Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Choose your avatar</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {avatarOptions.map((url) => (
              <button
                key={url}
                onClick={() => handleSelectAvatar(url)}
                className={`overflow-hidden rounded-xl border-2 p-1 transition-transform transform hover:scale-105 duration-300 ${
                  selectedAvatar === url
                    ? "border-purple-500"
                    : "border-gray-700 hover:border-purple-400"
                }`}
              >
                <img
                  src={url}
                  alt="avatar option"
                  className="w-full h-24 object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
