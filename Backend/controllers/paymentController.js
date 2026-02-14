import payfastClient from "../config/payfast.js";

export const createPayment = async (req, res) => {
  try {
    const { first_name, last_name, email, amount, item_name, item_description, order_id } = req.body;

    console.log('Payment request received:', { first_name, email, amount, item_name, order_id });

    // Validate required fields
    if (!first_name || !email || !amount || !item_name || !order_id) {
      return res.status(400).json({ 
        success: false,
        error: "Missing required fields"
      });
    }

    // Prepare payment data
    const paymentData = {
      return_url: process.env.PAYFAST_RETURN_URL,
      cancel_url: process.env.PAYFAST_CANCEL_URL,
      notify_url: process.env.PAYFAST_NOTIFY_URL?.trim(), // Added trim() to remove space
      name_first: first_name,
      name_last: last_name || '',
      email_address: email,
      m_payment_id: order_id,
      amount: parseFloat(amount).toFixed(2),
      item_name: item_name.substring(0, 100),
      item_description: item_description || item_name,
    };

    // Remove empty values
    Object.keys(paymentData).forEach(key => {
      if (!paymentData[key]) delete paymentData[key];
    });

    // Use node-payfast to create signature
    const urlString = payfastClient.createStringfromObject(paymentData);
    const signature = payfastClient.createSignature(urlString);
    const paymentObject = payfastClient.createPaymentObject(paymentData, signature);

    const urlToSend = payfastClient.getPayfastUrl();
    console.log('🔍 URL being sent to frontend:', urlToSend);
    console.log('🔍 Sandbox value when sending:', payfastClient.sandbox);

    // Return data for frontend to create form
    return res.json({ 
      success: true,
      url: urlToSend,
      data: paymentObject
    });

  } catch (error) {
    console.error("PAYFAST ERROR:", error);
    return res.status(500).json({ 
      success: false,
      error: "Payment initiation failed", 
      details: error.message 
    });
  }
};