import express from "express";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", paymentRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "TownshipsEats API is running" });
});

const PORT = process.env.PORT || 5401;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`PayFast Sandbox: ${process.env.PAYFAST_SANDBOX === 'true' ? 'YES' : 'NO'}`);
});