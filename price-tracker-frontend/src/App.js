import logo from './logo.svg';
import Login from './components/Login';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px' }}>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/product/:id" component={ProductPage} />
            {/* Add more routes here as needed */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
