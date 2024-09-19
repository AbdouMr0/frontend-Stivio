import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Products from './Components/Products';
import DetailsProduct from './Components/DetailsProduct';
import OrderPgae from './Components/OrderPgae';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<DetailsProduct />} />
        <Route path="/order" element={<OrderPgae />} />
        
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
