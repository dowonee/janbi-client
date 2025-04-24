import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/dashboard/Sidebar";
import Dashboard from "./pages/Dashboard";
import IntroPage from "./pages/Intro";
import History from "./pages/History";
import UrlDetail from "./pages/UrlDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
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
      </Routes>
    </Router>
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
