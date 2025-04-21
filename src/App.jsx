import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/dashboard/Sidebar";
import History from "./pages/History";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gray-50 p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
