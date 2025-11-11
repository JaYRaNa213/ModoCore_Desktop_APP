

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
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AddTemplate from "./pages/AddTemplate";
import EditTemplate from "./pages/EditTemplate";
import WindowControls from "./components/WindowControls";
import { useState } from "react";

import TabsManager from "./components/TabsManager";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">

      
      {/* Sidebar (responsive) */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
     

      {/* Right content */}
      <div className="relative flex flex-col flex-1 w-0">
        {/* Window controls (desktop only) */}
        <div className="hidden md:block">
          <WindowControls />
        </div>

        {/* Header */}
       <div className="sticky top-0 z-50">
  <TabsManager />
  <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
</div>


        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Auth routes */}
      

      {/* Main routes */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route
        path="/login"
        element={
          <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
            <Login />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
            <Register />
          </div>
        }
      />
              <Route path="/" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              {/* <Route path="/analytics" element={<Analytics />} /> */}
              {/* <Route path="/settings" element={<Settings />} /> */}
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/template/:id" element={<TemplateDetail />} />
              <Route path="/add-template" element={<AddTemplate />} />
              <Route path="/templates/edit/:id" element={<EditTemplate />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}
