// src/pages/Notifications.jsx
import { Bell, Clock, Zap } from "lucide-react";

const activities = [
  { type: "mode", text: "Switched to Coding Mode", time: "5 mins ago" },
  { type: "template", text: "Activated ‘Deep Focus’ template", time: "20 mins ago" },
  { type: "mode", text: "Switched to Break Mode", time: "1 hour ago" },
];

const reminders = [
  { text: "Team meeting at 3:00 PM", icon: <Clock className="text-blue-500" /> },
  { text: "Stretch for 5 minutes", icon: <Zap className="text-yellow-500" /> },
];

export default function Notifications() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">🔔 Notifications</h1>
        
        <div className="bg-[#0d131f] shadow rounded-xl p-5 border">
          <h2 className="text-lg font-semibold mb-3 text-white-700">Recent Activity</h2>
          <ul className="space-y-2">
            {activities.map((item, index) => (
              <li key={index} className="text-white-600 flex justify-between">
                <span>{item.text}</span>
                <span className="text-sm text-gray-400">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#0d131f] shadow rounded-xl p-5 border">
        <h2 className="text-lg font-semibold mb-3 text-white-700">Reminders</h2>
        <ul className="space-y-3">
          {reminders.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-white-600">
              {item.icon}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
