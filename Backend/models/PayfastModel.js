import 'dotenv/config';
import { PayFast } from 'node-payfast';

const payfastConfig ={
    sandbox: true,
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    passphrase: process.env.PAYFAST_PASSPHRASE,
    
};

const pf = new PayFast(payfastConfig);
export default pf;