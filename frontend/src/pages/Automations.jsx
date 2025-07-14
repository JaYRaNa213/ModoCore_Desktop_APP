// ✅ src/pages/Automations.jsx
import React, { useEffect, useState } from "react";
import { getAutomations, toggleAutomationStatus } from "../services/automationService";
import AutomationForm from "../components/AutomationForm";
import ToggleSwitch from "../components/ui/ToggleSwitch";

const Automations = () => {
  const [automations, setAutomations] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getAutomations();
      setAutomations(data || []);
    })();
  }, [refresh]);

  const handleToggle = async (id) => {
    await toggleAutomationStatus(id);
    setRefresh(!refresh);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">My Automations</h2>

      {automations.map((automation) => (
        <div key={automation._id} className="border p-4 rounded flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{automation.title}</h3>
            <p className="text-sm text-gray-500">Schedule: {automation.schedule || "N/A"}</p>
          </div>
          <ToggleSwitch
            checked={automation.isActive}
            onChange={() => handleToggle(automation._id)}
            label={automation.isActive ? "Active" : "Paused"}
          />
        </div>
      ))}

      <AutomationForm onSuccess={() => setRefresh(!refresh)} />
    </div>
  );
};

export default Automations;
