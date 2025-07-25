import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Login from './Login';
import Register from './Register';
import Home from './Home';

function RequireAuth({ children }) {
  const token = localStorage.getItem('access_token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function RedirectIfAuth({ children }) {
  const token = localStorage.getItem('access_token');
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<RedirectIfAuth><Login /></RedirectIfAuth>} />
        <Route path="/register" element={<RedirectIfAuth><Register /></RedirectIfAuth>} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/" element={<Navigate to={localStorage.getItem('access_token') ? '/home' : '/login'} replace />} />
        <Route path="*" element={<Navigate to={localStorage.getItem('access_token') ? '/home' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default App
