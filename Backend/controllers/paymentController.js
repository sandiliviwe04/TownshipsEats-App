// paymentController.js
import pf from '../models/PayfastModel.js';

export const createPayment = async (req, res) => {
  const paymentData = {
    return_url: process.env.PAYFAST_RETURN_URL,
    cancel_url: process.env.PAYFAST_CANCEL_URL || '', // optional
    notify_url: process.env.PAYFAST_NOTIFY_URL,
    name_first: req.body.first_name,
    name_last: req.body.last_name,
    email_address: req.body.email,
    amount: String(req.body.amount), // must be a string
    item_name: req.body.item_name,
    item_description: req.body.item_description,
    m_payment_id: req.body.order_id, // unique order ID
  };

  try {
    // Step 1: create string for signature
    const urlString = pf.createStringfromObject(paymentData);

    // Step 2: create signature
    const signature = pf.createSignature(urlString);

    // Step 3: create payment object
    const paymentObject = pf.createPaymentObject(paymentData, signature);

    // Step 4: generate full PayFast URL (await is required!)
    const paymentUrl = await pf.generatePaymentUrl(paymentObject);

    if (!paymentUrl) {
      throw new Error('Failed to generate PayFast URL');
    }

    // Step 5: redirect user to sandbox
    return res.redirect(paymentUrl);

  } catch (error) {
    console.error('PayFast payment error:', error);
    return res.status(500).send(`Payment initiation failed: ${error.message}`);
  }
};

export const handleITN = async (req, res) => {
  const itnData = req.body;
  try {
    const isValid = pf.validateITN(itnData);

    if (isValid) {
      console.log('ITN valid. Payment status:', itnData.payment_status);
      // TODO: update database order status here
      return res.status(200).send('ITN processed');
    } else {
      console.error('ITN invalid signature');
      return res.status(400).send('Invalid ITN');
    }
  } catch (error) {
    console.error('ITN error:', error);
    return res.status(500).send(`ITN handling failed: ${error.message}`);
  }
};
