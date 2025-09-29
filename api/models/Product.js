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


// import mongoose from "mongoose";

// const FlowerProductSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, unique: true },
//     desc: { type: String, required: true },
//     img: { type: String, required: true },
//     categories: { type: [String], required: true }, // e.g. ['bouquet', 'seasonal']
//     color: { type: [String] },                     // e.g. ['red', 'white']
//     size: { type: [String] },                      // e.g. ['small', 'medium', 'large']
//     price: { type: Number, required: true },
//     inStock: { type: Boolean, default: true },
//     occasions: { type: [String] },                 // e.g. ['Birthday', 'Anniversary']
//     fragrance: { type: String },                   // e.g. 'Mild', 'Strong', 'None'
//     freshnessDuration: { type: String },           // e.g. '5-7 days'
//     deliveryOptions: { type: [String] },           // e.g. ['Same-day', 'Midnight']
//     messageCardAvailable: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// const FlowerProduct = mongoose.model("FlowerProduct", FlowerProductSchema);

// export default FlowerProduct;
