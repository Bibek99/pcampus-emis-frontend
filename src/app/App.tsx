import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
