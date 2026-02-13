const pf = import('../models/PayfastModel');

export const handleITN = async (req, res) => {
  const itnData = req.body;
  try {
    // ITN requires security checks like validating the signature and source IP
    // The node-payfast library should have utilities for this. Refer to its documentation.

    // Example verification (adjust based on actual library methods):
    const isValid = pf.validateITN(itnData); 

    if (isValid) {
      // Update your database with the payment status, e.g., mark order as paid
      console.log('ITN valid. Payment status:', itnData.payment_status);
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
