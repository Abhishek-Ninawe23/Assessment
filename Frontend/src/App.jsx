import React, { lazy } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Lazy load pages (improves initial load time)
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const KanbanBoard = lazy(() => import("./pages/KanbanBoard"));


function App() {

  return (
    <>

      <div>


        <Navbar />

        <div style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<div>Welcome — <Link className='text-indigo-600' to="/kanban">Open Kanban</Link></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            {/* Protected dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />


            {/* Protected Kanban Board */}
            <Route
              path="/kanban"
              element={
                <ProtectedRoute>
                  <KanbanBoard />
                </ProtectedRoute>
              } />


          </Routes>
        </div>
      </div >

    </>
  )
}

export default App
