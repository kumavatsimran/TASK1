import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import Home from './component/Home';
import ProfileShow from './component/ProfileShow';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />

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
