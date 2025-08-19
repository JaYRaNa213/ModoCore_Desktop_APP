// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";        // <-- use configured axios instance
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const avatarOptions = [
  "https://i.pinimg.com/736x/95/12/5a/95125ac77562207868d8f62e9a81ba36.jpg",
  "https://i.pinimg.com/736x/8c/9b/07/8c9b07e5f25b7776190bf9de4da60c47.jpg",
  "https://i.pinimg.com/736x/9c/fa/7c/9cfa7c3fffbcb226f3343e62bf46cbbc.jpg",
  "https://img.freepik.com/premium-vector/cute-woman-avatar-profile-vector-illustration_1058532-14592.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj8WLgmAkrbhlRtC8mi4bYZihfAuCDuwj8rqGU0PV2e33GZTKOneE3TJXQle2f9OJX5fo&usqp=CAU",
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/446b1af0-e6ba-4b0f-a9de-6ae6d3ed27a3/dfjhqoh-d2d37dca-d8e2-4bf3-8f7e-cd687599ea79.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ0NmIxYWYwLWU2YmEtNGIwZi1hOWRlLTZhZTZkM2VkMjdhM1wvZGZqaHFvaC1kMmQzN2RjYS1kOGUyLTRiZjMtOGY3ZS1jZDY4NzU5OWVhNzkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.E2rGYQQK4INfTcsF1MFFowAAzQunkuLkEpPQ-Vrb9PI",
  "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg",
  "https://static.vecteezy.com/system/resources/previews/052/755/981/non_2x/a-man-profile-avatar-icon-with-a-white-background-free-vector.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8OqmaM2JMF1M-gd44wB2ZBBWxRUdqBFWjbQbdmMwI7UTOr9HL0FWuqK4liM2af2MxqMw&usqp=CAU",
  "https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-male-face-avatar-man-beard-suit-shirt-necktie-portrait-businessman-icon-vector-illustration-189004563.jpg",
  "https://i.pinimg.com/736x/b8/59/36/b85936c4b3ca048b361bde89d6d79c3a.jpg",
  "https://i.pinimg.com/736x/97/c8/5f/97c85ff41a3cf73c250c78c5be620bb1.jpg"

];
export default function Profile() {
  const { user, login } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [profile, setProfile] = useState({ username: "Guest User", email: "" });

  // If logged in → fetch real profile info
  useEffect(() => {
    if (user) {
      setProfile({ username: user.username, email: user.email });
    }
  }, [user]);

  const handleSelectAvatar = (url) => {
    setSelectedAvatar(url);

    if (user) {
  login(
    { ...user, profileImage: url },  
    localStorage.getItem("token")
  );
  toast.success("Avatar selected!");
} else {
  // Guest user – just update the local selectedAvatar state
  setSelectedAvatar(url);
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

        <div className="bg-neutral-800 rounded-xl p-6 space-y-4 text-center">
          <img
            src={selectedAvatar}
            className="w-24 h-24 rounded-full mx-auto"
            alt="avatar"
          />
          <p className="text-xl font-semibold">{profile.username}</p>
          <p className="text-gray-400 text-sm">
            {profile.email || "Not logged in"}
          </p>
        </div>

        <h3 className="text-lg mt-6">Choose your avatar</h3>
        <div className="grid grid-cols-6 gap-4">
          {avatarOptions.map((url) => (
            <button
              key={url}
              onClick={() => handleSelectAvatar(url)}
              className={`p-2 rounded-xl border ${
                selectedAvatar === url ? "border-purple-500" : "border-gray-700"
              }`}
            >
              <img src={url} className="rounded-full" alt="avatar option" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}