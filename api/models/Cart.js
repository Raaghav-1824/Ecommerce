import mongoose from "mongoose";

const userCart = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    products: [
      {
        productId: { type: String, unique: true },
      },
      {
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", userCart);
