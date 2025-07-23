// ✅ src/hooks/useFetchLogs.js
import { useEffect, useState } from "react";
import { getAutomationLogs } from "../services/automationService";

export default function useFetchLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAutomationLogs()
      .then(setLogs)
      .catch((err) => console.error("Failed to fetch logs:", err))
      .finally(() => setLoading(false));
  }, []);

  return { logs, loading };
}