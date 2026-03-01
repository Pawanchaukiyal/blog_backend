import dotenv from "dotenv";

dotenv.config();

if (!process.env.CLOUDINARY_API_KEY) {
  console.log("ENV DEBUG:");
  console.log(process.env);
}

export default {};