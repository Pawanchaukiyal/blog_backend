import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import autRoutes from './src/routes/auth.routes.js';
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

//Routes
app.use('/api/auth', autRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");

  await mongoose.connection.close();
  console.log("MongoDB connection closed");

  process.exit(0);
})