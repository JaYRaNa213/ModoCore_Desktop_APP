// src/components/LogTable.jsx
import React, { useEffect, useState } from "react";
import { getAutomationLogs } from "../services/automationService";

const LogTable = ({ automationId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!automationId) return;

    const fetchLogs = async () => {
      try {
        const data = await getAutomationLogs(automationId);
        setLogs(data.logs || []);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [automationId]);

  if (!automationId) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Execution Logs</h2>
      {loading ? (
        <div className="text-gray-500">Loading logs...</div>
      ) : logs.length === 0 ? (
        <div className="text-gray-400 italic">No logs found.</div>
      ) : (
        <div className="overflow-x-auto border rounded shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">#</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Started At</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={log._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      log.status === "success"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {log.status}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(log.startedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {log.message || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogTable;
