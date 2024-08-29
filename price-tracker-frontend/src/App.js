import logo from './logo.svg';
import Login from './components/Login';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import ProductPage from './components/ProductPage';
import TopBar from './components/TopBar';

function App() {
  return (
    <Router>
      <div>
        <TopBar />
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
