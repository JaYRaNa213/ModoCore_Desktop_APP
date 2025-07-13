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
import PrivateRoute from "./auth/PrivateRoute";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Workspaces from "./pages/Workspaces";
import Register from "./auth/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <PrivateRoute>
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex flex-col flex-1 bg-gray-50">
                <Header />
                <main className="p-6 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/workspaces" element={<Workspaces />} />
                    <Route path="/template/:id" element={<TemplateDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
