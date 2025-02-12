import { Link, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer"
import React from 'react';
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import UpdateProject from "./components/UpdateProject";
import Signup from "./components/SignUp";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./components/UserDashboard";
import Projects from "./components/Projects";
import Users from "./components/Users";


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<LandingPage />} /> {/* Landing Page Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/users" element={<Users />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/admin/projects/:projectId/edit" element={<ProtectedRoute element={<UpdateProject />} />} /> {/* Route for updating */}
        {/* other routes */}
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch-all route for invalid URLs */}
        
    </Routes>
    <Toaster/>
    </>
    
  );
}

export default App;
