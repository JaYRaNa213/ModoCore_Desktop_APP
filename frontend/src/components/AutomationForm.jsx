// ✅ src/components/AutomationForm.jsx
import React, { useState, useEffect } from "react";
import automationService from "../services/automationService";
import CronHelperModal from "./CronHelperModal";

const AutomationForm = ({ automation = null, onSuccess }) => {
  const [title, setTitle] = useState(automation?.title || "");
  const [actions, setActions] = useState(automation?.actions || []);
  const [schedule, setSchedule] = useState(automation?.schedule || "");
  const [showCronHelper, setShowCronHelper] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, actions, schedule };

    try {
      if (automation) {
        await automationService.updateAutomation(automation._id, payload);
      } else {
        await automationService.createAutomation(payload);
      }
      onSuccess?.();
    } catch (err) {
      console.error("Automation save error:", err);
    }
  };

  const handleAddAction = () => {
    setActions([...actions, { type: "app", value: "" }]);
  };

  const handleActionChange = (i, field, value) => {
    const updated = [...actions];
    updated[i][field] = value;
    setActions(updated);
  };

  return (
    <div className="p-4 border rounded mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block font-medium">Title</label>
          <input
            className="w-full border px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium">Actions</label>
          {actions.map((action, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <select
                value={action.type}
                onChange={(e) => handleActionChange(i, "type", e.target.value)}
                className="border px-1 py-1"
              >
                <option value="app">App</option>
                <option value="url">URL</option>
                <option value="music">Music</option>
              </select>
              <input
                className="flex-1 border px-2 py-1"
                value={action.value}
                onChange={(e) => handleActionChange(i, "value", e.target.value)}
                placeholder="Enter path or URL"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddAction} className="text-blue-500 text-sm">
            + Add Action
          </button>
        </div>

        <div className="mb-2">
          <label className="block font-medium">Schedule (CRON)</label>
          <input
            className="w-full border px-2 py-1"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="e.g. * * * * *"
          />
          <button
            type="button"
            onClick={() => setShowCronHelper(true)}
            className="text-blue-500 text-sm mt-1"
          >
            Need help with CRON?
          </button>
        </div>

        <button className="bg-blue-600 text-white px-4 py-1 rounded">
          {automation ? "Update" : "Create"}
        </button>
      </form>

      {showCronHelper && <CronHelperModal onClose={() => setShowCronHelper(false)} />}
    </div>
  );
};

export default AutomationForm;
