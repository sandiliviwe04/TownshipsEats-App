// PayfastModel.js
import 'dotenv/config';
import { PayFast } from 'node-payfast';

// Check that env variables exist
if (!process.env.PAYFAST_MERCHANT_ID || !process.env.PAYFAST_MERCHANT_KEY) {
  console.error(
    'PayFast env variables missing! Check .env file for PAYFAST_MERCHANT_ID and PAYFAST_MERCHANT_KEY'
  );
}

const pf = new PayFast({
  sandbox: true,
  merchant_id: process.env.PAYFAST_MERCHANT_ID,
  merchant_key: process.env.PAYFAST_MERCHANT_KEY,
  passphrase: process.env.PAYFAST_PASSPHRASE || '',
});

export default pf;
