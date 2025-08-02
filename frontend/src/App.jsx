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
// import Workspaces from "./pages/Workspaces";
import AddTemplate from "./pages/AddTemplate";
import Automations from "./pages/Automations";
import AutomationLogs from "./pages/AutomationLogs";
// import AdminPanel from "./pages/AdminPanel";
import Logs from "./pages/Logs"; // ✅ Import

import EditTemplate from "./pages/EditTemplate"; 

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-50">
        <Header />
        <main className="p-6 overflow-y-auto">
          <Routes>
            {/* 🔓 Public Routes */}

            <Route path="/" element={<Dashboard />} />

            {/* <Route
  path="/"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/> */}

            
            <Route path="/templates" element={<Templates />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            
            {/* <Route path="/workspaces" element={<Workspaces />} /> */}

            <Route path="/template/:id" element={<TemplateDetail />} />

            {/* 🔒 Only protect the ones you want */}
            <Route
  path="/add-template"
  element={
    <PrivateRoute>
      <AddTemplate />
    </PrivateRoute>
  }
/>

            <Route
  path="/templates/edit/:id"
  element={
    <PrivateRoute>
      <EditTemplate />
    </PrivateRoute>
  }
/>
<Route
  path="/automations"
  element={
    <PrivateRoute>
      <Automations />
    </PrivateRoute>
  }
/>
<Route
  path="/automation-logs"
  element={
    <PrivateRoute>
      <AutomationLogs />
    </PrivateRoute>
  }
/>
<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>


            {/* 🧾 Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />



            {/* 🚫 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
