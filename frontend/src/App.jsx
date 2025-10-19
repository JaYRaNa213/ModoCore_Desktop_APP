// import { Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Templates from "./pages/Templates";
// import Analytics from "./pages/Analytics";
// import Settings from "./pages/Settings";
// import NotFound from "./pages/NotFound";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import TemplateDetail from "./pages/TemplateDetail";
// import Login from "./auth/Login";
// import Register from "./auth/Register";
// import PrivateRoute from "./auth/PrivateRoute";
// import Profile from "./pages/Profile";
// import Notifications from "./pages/Notifications";
// import AddTemplate from "./pages/AddTemplate";
// import Automations from "./pages/Automations";
// import AutomationLogs from "./pages/AutomationLogs";
// import Logs from "./pages/Logs";
// import EditTemplate from "./pages/EditTemplate";
// import WindowControls from "./components/WindowControls";
// import { useState } from "react";

// function Layout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
//       {/* Sidebar (responsive) */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Main panel */}
//       <div className="relative flex flex-col flex-1 w-0">
//         {/* Window controls (desktop only) */}
//         <div className="hidden md:block">
//           <WindowControls />
//         </div>

//         {/* Header */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         {/* Main content */}
//         <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route
//         path="/login"
//         element={
//           <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
//             <Login />
//           </div>
//         }
//       />
//       <Route
//         path="/register"
//         element={
//           <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
//             <Register />
//           </div>
//         }
//       />

//       {/* Protected & main routes */}
//       <Route
//         path="*"
//         element={
//           <Layout>
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/templates" element={<Templates />} />
//               {/* <Route path="/logs" element={<Logs />} /> */}
//               {/* <Route path="/analytics" element={<Analytics />} /> */}
//               {/* <Route path="/settings" element={<Settings />} /> */}
//               <Route path="/notifications" element={<Notifications />} />
//               <Route path="/template/:id" element={<TemplateDetail />} />
//               <Route path="/add-template" element={<AddTemplate />} />
//               <Route path="/templates/edit/:id" element={<EditTemplate />} />
//               {/* <Route path="/automations" element={<Automations />} /> */}
//               {/* <Route path="/automation-logs" element={<AutomationLogs />} /> */}
//               <Route path="/profile" element={<Profile />} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </Layout>
//         }
//       />
//     </Routes>
//   );
// }



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
import { useState } from "react";

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
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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

      {/* Main routes */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/templates" element={<Templates />} />
              {/* <Route path="/analytics" element={<Analytics />} /> */}
              {/* <Route path="/settings" element={<Settings />} /> */}
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/template/:id" element={<TemplateDetail />} />
              <Route path="/add-template" element={<AddTemplate />} />
              <Route path="/templates/edit/:id" element={<EditTemplate />} />
              {/* <Route path="/automations" element={<Automations />} /> */}
              {/* <Route path="/automation-logs" element={<AutomationLogs />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}
