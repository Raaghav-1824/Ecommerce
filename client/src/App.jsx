import React, { lazy, Suspense } from "react"; // Import lazy and Suspense
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// 👇 LAZY LOAD ALL ROUTE COMPONENTS
const BuyProdcut = lazy(() => import("./pages/BuyProdcut"));
const Home = lazy(() => import("./pages/Home"));
const ProductList = lazy(() => import("./pages/ProductList"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));


function App() {
  const user = useSelector((state) => state.user.currentUser);
  
  return ( 
    <BrowserRouter>
      {/* WRAP ROUTES IN SUSPENSE WITH A FALLBACK */}
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <h2>Loading Page...</h2>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<BuyProdcut />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;