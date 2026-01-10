import OtpModel from "../models/Otp.js";
import User from "../models/User.js";
import { generateOTP ,hashOTP } from "../../utils/generateOTP.js";

export const createOtpAndSend = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      status: "failed",
      message: "User does not exist."
    });
  }

  const otp = generateOTP();
  const hashedOTP = hashOTP(otp);

  await OtpModel.create({
    email: user.email,
    otp: hashedOTP,
    expiresAt: Date.now() + 5 * 60 * 1000
  });

  console.log("OTP generated for:", user.email);

  return res.status(200).json({
    status: "success",
    message: "OTP created and saved in DB"
  });
};
