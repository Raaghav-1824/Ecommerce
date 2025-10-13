import React, { lazy, Suspense } from "react"; // Import lazy and Suspense
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loader from "./Components/cart/Loader";

// LAZY LOAD ALL 
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
            <Loader></Loader>
          </div>
        }
      >
        {/* <ProtectedRoute> */}
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<BuyProdcut />} />
          </Route>

          {/* </ProtectedRoute> */}

          {/* public routes */}
          <Route
            path="/login"
            element={<Login />}
          />
          <Route path="/register" element={<Register />} />

          {/* Optional: Add a catch-all route for 404s */}
         <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
