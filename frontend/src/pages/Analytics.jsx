import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"];

const focusData = [
  { name: "Coding", value: 180 },
  { name: "Meetings", value: 90 },
  { name: "Study", value: 120 },
  { name: "Breaks", value: 60 },
];

const topTemplates = [
  { name: "Frontend Dev", time: "2h 15m" },
  { name: "Standup Meeting", time: "45m" },
  { name: "Focus Study", time: "1h 30m" },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">📊 Analytics</h1>
        <span className="text-sm text-gray-400">BETA v1.0.0</span>
      </div>

      {/* Focus Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl border shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Today’s Focus Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={focusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ name }) => name}
              >
                {focusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Templates */}
        <div className="bg-white p-6 rounded-xl border shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Top Used Templates
          </h2>
          <ul className="divide-y divide-gray-200">
            {topTemplates.map((template, i) => (
              <li key={i} className="py-3 flex justify-between text-gray-600">
                <span>{template.name}</span>
                <span className="font-medium">{template.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
