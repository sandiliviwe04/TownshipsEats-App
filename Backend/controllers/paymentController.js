// paymentController.js
import pf from '../models/PayfastModel.js';

export const createPayment = async (req, res) => {
  const paymentData = {
    return_url: process.env.PAYFAST_RETURN_URL,
    cancel_url: process.env.PAYFAST_CANCEL_URL,
    notify_url: process.env.PAYFAST_NOTIFY_URL,
    name_first: req.body.first_name,
    name_last: req.body.last_name,
    email_address: req.body.email,
    amount: String(req.body.amount), // make sure it's a string
    item_name: req.body.item_name,
    item_description: req.body.item_description,
    m_payment_id: req.body.order_id, // unique ID
  };

  try {
    const urlString = pf.createStringfromObject(paymentData);
    const hash = pf.createSignature(urlString);
    const paymentObject = pf.createPaymentObject(paymentData, hash);
    const generatePaymentUrl = await pf.generatePaymentUrl(paymentObject);

    res.redirect(generatePaymentUrl); // redirect to PayFast sandbox
  } catch (error) {
    console.error('PayFast payment error:', error);
    res.status(500).send('Payment initiation failed');
  }
};

export const handleITN = async (req, res) => {
  const itnData = req.body;
  try {
    const isValid = pf.validateITN(itnData);

    if (isValid) {
      console.log('ITN valid. Payment status:', itnData.payment_status);
      // Update your database here
      res.status(200).send('ITN processed');
    } else {
      console.error('ITN invalid signature');
      res.status(400).send('Invalid ITN');
    }
  } catch (error) {
    console.error('ITN error:', error);
    res.status(500).send('ITN handling failed');
  }
};
