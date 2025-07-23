// ✅ src/pages/LaunchHistory.jsx
import React from "react";
import useFetchLogs from "../hooks/useFetchLogs";
import { Card, CardContent } from "../components/ui/Card";

export default function LaunchHistory() {
  const { logs, loading } = useFetchLogs();

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">📜 Launch History</h2>
      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p>No automation logs found.</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <Card key={log._id}>
              <CardContent>
                <p><strong>Automation:</strong> {log.automationId?.title || "Unknown"}</p>
                <p><strong>Status:</strong> {log.status}</p>
                <p><strong>Triggered:</strong> {new Date(log.createdAt).toLocaleString()}</p>
                <p><strong>Source:</strong> {log.source}</p>
                {log.error && <p className="text-red-500">Error: {log.error}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}