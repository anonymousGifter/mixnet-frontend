import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Deposit from './pages/deposit.jsx';
import Withdraw from './pages/withdraw.jsx';
import Faucet from './pages/faucet.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/withdraw" element={<Withdraw/>} />
        <Route path="/deposit" element={<Deposit/>} />
        <Route path="/faucet" element={<Faucet/>} />
      </Routes>
    </Router>
    
  </React.StrictMode>,
    // <App />
)
