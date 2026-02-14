export const handleITN = async (req, res) => {
  console.log("========== ITN RECEIVED ==========");
  console.log("Body:", JSON.stringify(req.body, null, 2));
  console.log("==================================");
  
  // Set the ngrok-skip-browser-warning header
  res.setHeader('ngrok-skip-browser-warning', 'true');
  
  // Always respond with 200 to acknowledge receipt
  res.status(200).send("ITN received");
  
  // Process the payment asynchronously
  setTimeout(() => {
    try {
      const paymentData = req.body;
      
      if (paymentData.payment_status === 'COMPLETE') {
        console.log(`✅ Payment ${paymentData.m_payment_id || 'unknown'} was successful`);
        // TODO: Update your database here
      } else {
        console.log(`Payment status: ${paymentData.payment_status}`);
      }
    } catch (error) {
      console.error("Error processing ITN:", error);
    }
  }, 0);
};