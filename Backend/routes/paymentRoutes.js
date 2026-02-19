import express from "express";
import { createPayment } from "../controllers/paymentController.js";
import { handleITN } from "../controllers/itnController.js";

const router = express.Router();

// Payment endpoints
router.post("/payfast/pay", createPayment);
router.post("/payfast/notify", handleITN);

// Success and cancel pages
router.get("/payfast/success", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Payment Successful</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }
        .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
        .success { color: #4CAF50; font-size: 48px; margin-bottom: 20px; }
        h1 { color: #333; margin-bottom: 20px; }
        p { color: #666; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="success">✅</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your payment. You will be redirected shortly.</p>
      </div>
      <script>
        setTimeout(() => {
          window.location.href = 'http://localhost:5173';
        }, 3000);
      </script>
    </body>
    </html>
  `);
});

router.get("/payfast/cancel", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Payment Cancelled</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f5f5f5; }
        .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
        .cancelled { color: #ff9800; font-size: 48px; margin-bottom: 20px; }
        h1 { color: #333; margin-bottom: 20px; }
        p { color: #666; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="cancelled">⚠️</div>
        <h1>Payment Cancelled</h1>
        <p>Your payment was cancelled. You can try again or contact support.</p>
        <p>You will be redirected shortly.</p>
      </div>
      <script>
        setTimeout(() => {
          window.location.href = 'http://localhost:5173';
        }, 3000);
      </script>
    </body>
    </html>
  `);
});

export default router;