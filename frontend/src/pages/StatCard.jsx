// src/components/dashboard/StatCard.jsx
import React from "react";

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex items-center space-x-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h4 className="text-sm text-gray-500">{title}</h4>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}
