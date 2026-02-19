import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

const UserModel = {
    async findByEmail(email){
        const sql = 'SELECT * FROM users WHERE email =?';
        const [rows] = await pool.execute(sql, [email]);
        return rows[0];
    },

    async findById(id) {
       const sql = 'SELECT id, username, email, role, created_at FROM users WHERE id = ?';
       const [rows] = await pool.execute(sql, [id]);
       return rows[0];
    },

    async create(userData) {
        const { username, email, password, role = 'customer'} = userData;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [username, email, hashedPassword, role]);

        return result.insertId;
    },

    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
};

export default UserModel