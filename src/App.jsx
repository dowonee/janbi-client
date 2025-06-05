import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import IntroPage from "./pages/Intro";
import History from "./pages/History";
import UrlDetail from "./pages/UrlDetail";
import AuthSuccess from "./pages/AuthSuccess";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Support from "./pages/Support";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <IntroPage />
            </AppLayout>
          }
        />
        <Route path="/support" element={<Support />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/history"
          element={
            <AppLayout>
              <History />
            </AppLayout>
          }
        />
        <Route
          path="/history/:id"
          element={
            <AppLayout>
              <UrlDetail />
            </AppLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
