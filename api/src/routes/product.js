import express from "express";
import { verifyTokenAndAuth, verifyTokenAndAdmin } from "./verifyToken.js";
import Product from "../models/Product.js";
import cloudinary from "../helper/cloudinary.js";

const productRouter = express.Router();

// CREATE

productRouter.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE

productRouter.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const updateProduct = await Product.findByIdAndUpdate(
      productId,

      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

productRouter.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(
      productId,
      res.status(200).json("Product has been deleted.")
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET PRODUCT

import mongoose from "mongoose"; 

productRouter.get("/find/:id", async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

//GET ALL PRODUCTS

productRouter.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    // console.log(products)
    const extractPublicId = (url) => {
      if (!url.includes('cloudinary.com')) {
        return url.replace(/\.[^/.]+$/, ""); 
      }
      // Extract public ID from Cloudinary URL
      const match = url.match(/\/upload\/[^\/]+\/(.+?)(?:\?|$)/);
      return match ? match[1].replace(/\.[^/.]+$/, "") : url;
    };
    
    const optimizedProducts = products.map(product => {
      const publicId = extractPublicId(product.img);
      
      return {
          ...product._doc,
          image: cloudinary.url(publicId, {
              fetch_format: "webp",
              quality: "auto",
              width: 500,
              crop: "scale",
          }),
      };
    });
    // console.log(optimizedProducts)
  res.status(200).json(optimizedProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default productRouter;
