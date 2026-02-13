// paymentRoutes.js
import express from 'express';
import { createPayment, handleITN } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payfast/pay', createPayment);
router.post('/payfast/notify', handleITN); // ITN endpoint from PayFast
router.get('/payfast/success', (req,res) => res.send('Payment Success'));
router.get('/payfast/cancel', (req,res) => res.send('Payment Cancelled')); // optional

export default router;
