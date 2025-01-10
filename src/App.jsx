import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import Home from './component/Home';
import ProfileShow from './component/ProfileShow';

function App() {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to protect routes
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />

        {/* Protected Routes */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Show"
          element={
            <ProtectedRoute>
              <ProfileShow />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
