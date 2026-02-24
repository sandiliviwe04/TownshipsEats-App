import pool from '../config/database.js';

const VendorModel = {
    async getAllActive() {
        const [rows] = await pool.execute(
            'SELECT id, business_name as name, cuisine_type as cuisine, delivery_fee, rating FROM vendors WHERE is_active = true ORDER BY rating DESC'
        );
        return rows;
    },

    async getById(id) {
        const [rows] = await pool.execute(
            'SELECT id, business_name as name, cuisine_type as cuisine, delivery_fee, rating FROM vendors WHERE id = ? AND is_active = true',
            [id]
        );
        return rows[0];
    },

    async getMenu(vendorId) {
        const [rows] = await pool.execute(`
            SELECT m.*, c.name as category_name
            FROM menu_items m
            LEFT JOIN categories c ON m.category_id = c.id
            WHERE m.vendor_id = ? AND m.is_available = true
            ORDER BY c.name, m.name
        `, [vendorId]);
        return rows;
    }
};

export default VendorModel;