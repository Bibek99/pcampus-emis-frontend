import Error404 from '@errors/Error404';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './auth/LoginForm';

export const App = () => {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
