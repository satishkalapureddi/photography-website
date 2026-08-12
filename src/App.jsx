import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";

import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function ProtectedAdmin() {
  const loggedIn =
    localStorage.getItem("visuals_admin");

  return loggedIn === "true" ? (
    <AdminDashboard />
  ) : (
    <Navigate
      to="/admin"
      replace
    />
  );
}


function App() {

  return (
    <>
      <Loader />

      <CustomCursor />

      <AnimatePresence mode="wait">

        <Routes>

          {/* PUBLIC WEBSITE */}

          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          <Route
            path="/services"
            element={
              <PageTransition>
                <ServicesPage />
              </PageTransition>
            }
          />

          <Route
            path="/about"
            element={
              <PageTransition>
                <AboutPage />
              </PageTransition>
            }
          />

          {/* ADMIN */}

          <Route
            path="/admin"
            element={
              <AdminLogin />
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdmin />
            }
          />

        </Routes>

      </AnimatePresence>
    </>
  );
}

export default App;