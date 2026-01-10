import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jsonwebtoken from "jsonwebtoken";
import { createOtpAndSend } from "../services/authServices.js";
// import { forgotPassword } from "../controllers/auth/sendOTP.js";
import { generateOTP, hashOTP } from "../../utils/generateOTP.js";



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
      process.env.SEC_KEY
    ).toString(),
    isAdmin : req.body.isAdmin
  });

  try {
    // console.log(newUser);
 
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
    
// jab tum CryptoJS.AES.decrypt() use karte ho, woh tumhe ek WordArray object deta hai (yeh basically raw binary/bytes hota hai, jo directly readable nahi hota).
// toString(CryptoJS.enc.Utf8) us raw data ko normal readable text (string) mein convert karta hai.
// Matlab:
// Encrypted → Decrypt kiya → Mila kuch raw gibberish bytes → Usko UTF-8 encoding ke through human-readable password string bana diya.

    // console.log("AAAAA", user.password);
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_KEY
    );
    // console.log("BBBBBB",hashedPassword);
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
        isAdmin: user.isAdmin | true,
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



// forgot-password 
authRouter.post("/forgot-password" , async(req, res)=>{
  console.log("called")
  try {
    await createOtpAndSend(req,res);
    //  res.status(200).json({message : "OTP sent to email"});
    
  } catch (error) {
     res.status(400).json({message : error.message})
  }
});







export default authRouter;
