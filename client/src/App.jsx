import React from "react";
import BuyProdcut from "./pages/BuyProdcut";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Wishlist from "./pages/Wishlist";



function App() {
  const user = useSelector((state) => state.user.currentUser);
  return ( 
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element = {<Wishlist/>}/>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<BuyProdcut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
