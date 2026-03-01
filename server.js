import "./src/config/env.js";   // MUST BE FIRST

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});