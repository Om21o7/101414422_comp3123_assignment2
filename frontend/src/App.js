import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import DashboardPage from './pages/DashboardPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/ProtectedRoute';  
import Navbar from './components/Navbar';
import EditEmployee from './components/EditEmployee';
import ViewEmployee from './components/ViewEmployee';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Navbar />
              <EmployeeManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Navbar />
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path='/view/:id'
          element={
            <ProtectedRoute>
              <Navbar />
              <ViewEmployee />
            </ProtectedRoute>
          }
        />  

        {/* Default Route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
