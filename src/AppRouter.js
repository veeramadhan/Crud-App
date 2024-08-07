import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Create from './Create';
import Update from './Update';
import Login from './pages/Login';

const AppRouter = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<App setAuthenticated={setAuthenticated} />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
