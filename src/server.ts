import app from "./app";
import connectDB from "./config/database";

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
