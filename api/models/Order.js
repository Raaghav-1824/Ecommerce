import mongoose from "mongoose";

const userOrder = new mongoose.Schema(
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
    amount: { type: Number, require: true },
    address: { type: Object, require: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", userOrder);
