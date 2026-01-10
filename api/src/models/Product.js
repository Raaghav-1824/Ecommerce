import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: [String], required: true },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    deliveryOptions: { type: [String] }, 
    freshnessDuration: { type: String },
    fragrance: { type: String },
    occasions: { type: [String] },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema); // Example for Mongoose model

export default Product; // Default export
