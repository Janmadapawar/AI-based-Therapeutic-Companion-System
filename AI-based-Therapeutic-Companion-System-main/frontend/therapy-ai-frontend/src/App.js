import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import Sleep from "./pages/Sleep";
import Mood from "./pages/Mood";
import Eye from "./pages/Eye";
import Chatbot from "./pages/Chatbot";
import Reports from "./pages/Reports"; // ✅ ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/sleep" element={<Sleep />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/eye" element={<Eye />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/reports" element={<Reports />} /> {/* ✅ ADD */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;