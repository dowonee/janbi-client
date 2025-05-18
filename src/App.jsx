import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/common/Header";
import Dashboard from "./pages/Dashboard";
import IntroPage from "./pages/Intro";
import History from "./pages/History";
import UrlDetail from "./pages/UrlDetail";
import AuthSuccess from "./pages/AuthSuccess";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();

  const isIntro = location.pathname === "/";

  return (
    <>
      {isIntro && <Header />}
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route
          path="/dashboard"
          element={
            <LayoutWithSidebar>
              <Dashboard />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/history"
          element={
            <LayoutWithSidebar>
              <History />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/history/:id"
          element={
            <LayoutWithSidebar>
              <UrlDetail />
            </LayoutWithSidebar>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function LayoutWithSidebar({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
