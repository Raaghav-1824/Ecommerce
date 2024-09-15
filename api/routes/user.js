import express from "express";
import { verifyTokenAndAuth, verifyTokenAndAdmin } from "./verifyToken.js";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.get("/usertest", (req, res) => {
  res.send("User test is successful !");
});

//UPDATE

userRouter.put("/:id", verifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

userRouter.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been Deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER

userRouter.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL USER

userRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.user;
  try {
    const user = query ? await User.find().limit(1) : await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// USER STATS

userRouter.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// lh:3000/api/user/usertest

export default userRouter;
