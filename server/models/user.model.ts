import { query } from '../db';

export interface User {
    id: number;
    email: string;
    password_hash: string;
    role: string;
    created_at: Date;
}

export const createUserTable = async () => {
    const text = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'employee',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
    await query(text);
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const text = 'SELECT * FROM users WHERE email = $1';
    const res = await query(text, [email]);
    if (res.rows.length > 0) {
        return res.rows[0];
    }
    return null;
};

export const createUser = async (email: string, passwordHash: string, role: string = 'employee'): Promise<User> => {
    const text = 'INSERT INTO users(email, password_hash, role) VALUES($1, $2, $3) RETURNING *';
    const res = await query(text, [email, passwordHash, role]);
    return res.rows[0];
};
