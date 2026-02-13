import express from 'express';
import { createPayment, handleITN } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payfast/pay', createPayment);
router.post('/payfast/notify', handleITN); // PayFast will POST here for ITN
// Optional: handle success/cancel if needed
router.get('/payfast/success', (req,res)=> res.send('Payment Success'));
router.get('/payfast/cancel', (req,res)=> res.send('Payment Cancelled'));// Define routes for success, cancel, and ITN here

export default router;
