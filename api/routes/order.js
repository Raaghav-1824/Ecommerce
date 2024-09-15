import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
  verifyToken,
} from "../routes/verifyToken.js";
import Order from "../models/Order.js";

const orderRouter = express.Router();

// CREATE

orderRouter.post("/create", verifyToken, async (req, res) => {
  const neworder = new Order(req.body);
  try {
    const savedOrder = await Order.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE

orderRouter.post("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  const orderId = req.params.id;
  try {
    const udpatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(udpatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

orderRouter.delete("/delete/:id", verifyTokenAndAuth, async (req, res) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER ORDER

orderRouter.get("/find/:user_id", verifyTokenAndAuth, async (req, res) => {
  const userId = req.params.user_id;
  try {
    const order = await Order.find(userId);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL ORDER

orderRouter.get("/find", verifyTokenAndAdmin, async (res, req) => {
  try {
    const orderAll = await Order.find();
    res.status(200).json(orderAll);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET MONTHLY INCOME

orderRouter.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default orderRouter;
