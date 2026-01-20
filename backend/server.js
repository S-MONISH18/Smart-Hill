import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import tractorRoutes from "./routes/tractorRoutes.js";
dotenv.config();

const app = express();

// ✅ Manual CORS middleware - MUST be before routes
app.use((req, res, next) => {  
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Max-Age", "86400");
  
  console.log(`${req.method.toUpperCase()} ${req.path}`);
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to tractorDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api/tractors", tractorRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "🌾 Tractor Backend Running" });
});

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
