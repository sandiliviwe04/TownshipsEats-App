import pool from '../config/database.js';

const OrderModel = {
    async create(userId, cartData, deliveryAddress) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            
            const orderNumber = 'ORD-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
            
            const [orderResult] = await connection.execute(`
                INSERT INTO orders 
                (user_id, vendor_id, order_number, subtotal, delivery_fee, total_amount, delivery_address)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
                userId, 
                cartData.vendor_id, 
                orderNumber, 
                cartData.subtotal, 
                cartData.delivery_fee, 
                cartData.total,
                deliveryAddress
            ]);
            
            const orderId = orderResult.insertId;
            
            for (const item of cartData.items) {
                await connection.execute(`
                    INSERT INTO order_items 
                    (order_id, menu_item_id, quantity, unit_price, subtotal)
                    VALUES (?, ?, ?, ?, ?)
                `, [
                    orderId,
                    item.menu_item_id,
                    item.quantity,
                    item.unit_price,
                    item.unit_price * item.quantity
                ]);
            }
            
            await connection.commit();
            return orderId;
            
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    async getUserOrders(userId) {
        const [orders] = await pool.execute(`
            SELECT o.*, v.business_name as vendor_name
            FROM orders o
            JOIN vendors v ON o.vendor_id = v.id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `, [userId]);
        return orders;
    },

    async getById(orderId, userId) {
        const [orders] = await pool.execute(`
            SELECT o.*, v.business_name as vendor_name
            FROM orders o
            JOIN vendors v ON o.vendor_id = v.id
            WHERE o.id = ? AND o.user_id = ?
        `, [orderId, userId]);
        
        if (orders.length === 0) return null;
        
        const order = orders[0];
        
        const [items] = await pool.execute(`
            SELECT oi.*, m.name
            FROM order_items oi
            JOIN menu_items m ON oi.menu_item_id = m.id
            WHERE oi.order_id = ?
        `, [orderId]);
        
        order.items = items;
        return order;
    },

    async updatePaymentStatus(orderId, paymentId, status = 'paid') {
        await pool.execute(
            'UPDATE orders SET payment_status = ?, payfast_payment_id = ? WHERE id = ?',
            [status, paymentId, orderId]
        );
    }
};

export default OrderModel;