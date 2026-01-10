import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
  verifyToken
} from "./verifyToken.js";
import Cart from "../models/Cart.js";


const cartRouter = express.Router();

// CREATE

cartRouter.post("/create", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE

cartRouter.post("/update/:id", verifyTokenAndAuth, async (req, res) => {
  const cartId = req.params.id;
  try {
    const udpatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(udpatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

cartRouter.delete("/delete/:id", verifyTokenAndAuth, async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    res.status(200).json("Cart has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER CART

cartRouter.get("/find/:user_id", verifyTokenAndAuth, async (req, res) => {
  const userId = req.params.user_id;
  try {
    const cart = await Cart.findOne(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL CART

cartRouter.get("/find", verifyTokenAndAdmin, async (res, req) => {
  try {
    const cartAll = await Cart.find();
    res.status(200).json(cartAll);
  } catch (error) {
    res.status(500).json(error);
  }
});
export default cartRouter;
