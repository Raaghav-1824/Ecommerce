import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname : {type:String , unique:false , required :false},
    lastname : {type:String , unique:false , required :false},
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
