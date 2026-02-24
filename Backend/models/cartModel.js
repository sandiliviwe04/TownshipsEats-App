import pool from '../config/database.js';

const CartModel = {
    async getUserCart(userId) {
        const [items] = await pool.execute(`
            SELECT c.*, m.name, m.description, v.business_name as vendor_name
            FROM cart c
            JOIN menu_items m ON c.menu_item_id = m.id
            JOIN vendors v ON c.vendor_id = v.id
            WHERE c.user_id = ?
        `, [userId]);
        
        const subtotal = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
        
        // Get delivery fee from first vendor (assuming all items from same vendor)
        let deliveryFee = 25.00;
        if (items.length > 0) {
            const [vendor] = await pool.execute('SELECT delivery_fee FROM vendors WHERE id = ?', [items[0].vendor_id]);
            deliveryFee = vendor[0]?.delivery_fee || 25.00;
        }
        
        return {
            items,
            vendor_id: items[0]?.vendor_id || null,
            vendor_name: items[0]?.vendor_name || null,
            delivery_fee: deliveryFee,
            subtotal,
            total: subtotal + deliveryFee
        };
    },

    async addItem(userId, vendorId, menuItemId, quantity = 1) {
        // Get menu item price
        const [menuItems] = await pool.execute('SELECT price FROM menu_items WHERE id = ?', [menuItemId]);
        if (menuItems.length === 0) throw new Error('Menu item not found');
        
        const unit_price = menuItems[0].price;
        
        // Check if item already in cart
        const [existing] = await pool.execute(
            'SELECT id, quantity FROM cart WHERE user_id = ? AND menu_item_id = ?',
            [userId, menuItemId]
        );
        
        if (existing.length > 0) {
            // Update quantity
            await pool.execute(
                'UPDATE cart SET quantity = quantity + ? WHERE id = ?',
                [quantity, existing[0].id]
            );
        } else {
            // Insert new item
            await pool.execute(
                'INSERT INTO cart (user_id, menu_item_id, vendor_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)',
                [userId, menuItemId, vendorId, quantity, unit_price]
            );
        }
        
        return await CartModel.getUserCart(userId);
    },

    async updateQuantity(userId, itemId, quantity) {
        await pool.execute(
            'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
            [quantity, itemId, userId]
        );
    },

    async removeItem(userId, itemId) {
        await pool.execute(
            'DELETE FROM cart WHERE id = ? AND user_id = ?',
            [itemId, userId]
        );
    },

    async clearCart(userId) {
        await pool.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
    }
};

export default CartModel;