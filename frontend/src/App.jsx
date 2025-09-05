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

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Right panel */}
      <div className="relative flex flex-col flex-1">
        {/* Window controls */}
        <WindowControls />

        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Wrap login & register with layout */}
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />

      {/* All other routes */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              {/* <Route path="/logs" element={<Logs />} /> */}
              {/* <Route path="/analytics" element={<Analytics />} /> */}
              {/* <Route path="/settings" element={<Settings />} /> */}
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/template/:id" element={<TemplateDetail />} />
              <Route path="/add-template" element={<AddTemplate />} />
              <Route path="/templates/edit/:id" element={<EditTemplate />} />
              {/* <Route path="/automations" element={<Automations />} /> */}
              {/* <Route path="/automation-logs" element={<AutomationLogs />} /> */}

              <Route path="/profile" element={<Profile />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}
