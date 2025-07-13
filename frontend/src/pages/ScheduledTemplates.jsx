// src/pages/ScheduledTemplates.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const scheduledTemplates = [
  {
    id: 1,
    name: "Morning Focus",
    time: "08:00 AM",
    frequency: "Daily",
    apps: ["Notion", "Spotify", "VS Code"],
  },
  {
    id: 2,
    name: "Evening Wrap-Up",
    time: "06:30 PM",
    frequency: "Weekdays",
    apps: ["Todoist", "Slack"],
  },
];

export default function ScheduledTemplates() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Scheduled Templates</h2>
        <Button variant="default">+ New Schedule</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {scheduledTemplates.map((template) => (
          <Card key={template.id} className="rounded-2xl shadow-md">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{template.name}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {template.frequency}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} /> {template.time}
              </div>
              <div className="text-sm text-gray-500">
                Apps: {template.apps.join(", ")}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
