import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Account from './account';
import Layout from './layout';
import Login from './login';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<>Home</>} />
              <Route element={<ProtectedRoute />}>
                <Route path="account" element={<Account />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App;
