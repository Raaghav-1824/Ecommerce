import mongoose, { mongo } from "mongoose";

const OTPschema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, expires: 0 }  // Document auto-delete after expiresAt
  });

  
const OtpModel = mongoose.model('OtpModel' ,  OTPschema)

export default OtpModel;