import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jsonwebtoken from "jsonwebtoken";

// const jwt = jsonwebtoken();

const authRouter = express.Router();

//REGISTER
authRouter.post("/register", async (req, res) => {
 
  const newUser = User({
    firstname : req.body.firstName,
    lastname: req.body.lastName,
    username: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.AUTH_KEY
    ).toString(),

  });

  try {
    console.log(newUser);
 
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({ message: `Duplicate value for field: ${field}` });
    } else {
      res.status(500).json(error);
    }
  }
});



//LOGIN
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User does not exist",
      });
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_KEY
    );
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (req.body.password !== decryptedPassword) {
      return res.status(401).json({
        status: "failed",
        message:
          "Invalid email or password. Please try again with the correct credentials.",
      });
    }

    const { password, ...others } = user._doc;

    const accessToken = jsonwebtoken.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      status: "success",
      message: "You have successfully logged in.",
      ...others,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
});

export default authRouter;
