import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.js";
import userRouter from "./src/routes/user.js";
import productRouter from "./src/routes/product.js";
import cartRouter from "./src/routes/cart.js";
import orderRouter from "./src/routes/order.js";
import paymentRouter from "./src/routes/payment.js";
import cors from "cors";
import wishlistRouter from "./src/routes/wishlistRoute.js";
const app = express();
app.use(express.json());
dotenv.config();
// Apply CORS middleware
app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successfully !");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api", paymentRouter);
app.use("/api/wishlist" , wishlistRouter)

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API is running successfully!'); // This would resolve the 404 for the root URL
});
