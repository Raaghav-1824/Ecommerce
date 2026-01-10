import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (filePath, folder) => {
  return await cloudinary.uploader.upload(filePath, { 
    folder,
    quality: "auto", 
    fetch_format: "webp" 
  });
};

export const getImageUrl = (publicId, width = 500) => {
  return cloudinary.url(publicId, { 
    fetch_format: "webp", 
    quality: "auto",
    width, 
    crop: "scale" 
  });
};

export default cloudinary;