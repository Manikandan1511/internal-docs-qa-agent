// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/components/LoginPage";
import Dashboard from "@/components/Dashboard";
import ChatPage from "@/components/ChatPage";
import UploadPage from "@/components/UploadPage";   
import DocsPage from "@/components/DocsPage";      
import ProfilePage from "@/components/ProfilePage"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/upload" element={<UploadPage />} />   
        <Route path="/docs" element={<DocsPage />} />       
        <Route path="/profile" element={<ProfilePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;