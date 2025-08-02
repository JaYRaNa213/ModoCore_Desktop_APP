// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TemplateDetail from "./pages/TemplateDetail";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PrivateRoute from "./auth/PrivateRoute";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AddTemplate from "./pages/AddTemplate";
import Automations from "./pages/Automations";
import AutomationLogs from "./pages/AutomationLogs";
import Logs from "./pages/Logs";
import EditTemplate from "./pages/EditTemplate";
import WindowControls from "./components/WindowControls";

export default function App() {
  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Right panel */}
      <div className="relative flex flex-col flex-1">
        {/* Top window controls (close/min/max) */}
        <WindowControls />

        {/* Header bar (below window controls) */}
        <Header />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            {/* 🔓 Public */}
              {/* <Route
  path="/"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/> */}

            <Route path="/" element={<Dashboard />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/template/:id" element={<TemplateDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔒 Protected */}
            <Route
              path="/add-template"
              element={
                // <PrivateRoute>
                  <AddTemplate />
                // </PrivateRoute>
              }
            />
            <Route
              path="/templates/edit/:id"
              element={
                // <PrivateRoute>
                  <EditTemplate />
                // </PrivateRoute>
              }
            />
            <Route
              path="/automations"
              element={
                // <PrivateRoute>
                  <Automations />
                // </PrivateRoute>
              }
            />
            <Route
              path="/automation-logs"
              element={
                // <PrivateRoute>
                  <AutomationLogs />
                // </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                // <PrivateRoute>
                  <Profile />
                // </PrivateRoute>
              }
            />

            {/* 🚫 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
