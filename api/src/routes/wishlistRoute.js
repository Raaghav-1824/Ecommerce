import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
  verifyToken,
} from "./verifyToken.js";
import WishlistModel from "../models/WishlistModel.js";

const wishlistRouter = express.Router();

// Wishlist controller
// POST /wishlist - add product to wishlist
wishlistRouter.post("/", verifyToken, async (req, res) => {
  const { userId, productId } = req.body;
  console.log(req.body);

  try {
    let wishlist = await WishlistModel.findOne({ userId });
    if (!wishlist) {
      wishlist = new WishlistModel({ userId, products: [] });
    }
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to wishlist", details: error.message });
  }
});

// DELETE /wishlist/:productId - remove product from wishlist
wishlistRouter.delete("/:productId", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const wishlist = await WishlistModel.findOne({ userId });
    if (wishlist && wishlist.products.includes(productId)) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
      await wishlist.save();
      res.status(200).json("Product removed from wishlist");
    } else {
      res.status(404).json("Product not found in wishlist");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product", details: error.message });
  }
});


// // CREATE

// // POST /wishlist/add
// wishlistRouter.post("/add", verifyToken, async (req, res) => {
//   const userId = req.user.id;
//   const { productId } = req.body;

//   try {
//     let wishlist = await WishlistModel.findOne({ userId });
//     if (!wishlist) {
//       wishlist = new WishlistModel({ userId, products: [productId] });
//     } else if (!wishlist.products.includes(productId)) {
//       wishlist.products.push(productId);
//     }
//     const savedWishlist = await wishlist.save();
//     res.status(200).json(savedWishlist);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // DELETE /wishlist/remove/:productId
// wishlistRouter.delete("/remove/:productId", verifyToken, async (req, res) => {
//   const userId = req.user.id;
//   const { productId } = req.params;

//   try {
//     const wishlist = await WishlistModel.findOne({ userId });
//     if (wishlist && wishlist.products.includes(productId)) {
//       wishlist.products = wishlist.products.filter(
//         (id) => id.toString() !== productId
//       );
//       await wishlist.save();
//       res.status(200).json("Product removed from wishlist");
//     } else {
//       res.status(404).json("Product not found in wishlist");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // GET /wishlist/find/:userId
// wishlistRouter.get("/find", verifyToken, async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const wishlist = await WishlistModel.findOne({ userId }).populate(
//       "products"
//     );
//     res.status(200).json(wishlist);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// // DELETE /wishlist/clear
// wishlistRouter.delete("/clear", verifyToken, async (req, res) => {
//   const userId = req.user.id;

//   try {
//     await WishlistModel.findOneAndDelete({ userId });
//     res.status(200).json("Wishlist cleared");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

export default wishlistRouter;
