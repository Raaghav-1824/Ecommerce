import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import paymentRouter from "./routes/payment.js";
import cors from "cors" ;
const app = express();
app.use(express.json());
dotenv.config();
// Apply CORS middleware
app.use(cors()); 


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
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api", paymentRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
