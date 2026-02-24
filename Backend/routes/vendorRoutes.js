import express from 'express';
import { getVendors, getVendorById, getVendorMenu } from '../controllers/vendorController.js';

const router = express.Router();

router.get('/', getVendors);
router.get('/:id', getVendorById);
router.get('/:id/menu', getVendorMenu);

export default router;