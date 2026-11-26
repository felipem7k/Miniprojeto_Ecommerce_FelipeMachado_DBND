import { Pool } from 'pg';

export const pool = new Pool({
    user: process.env.DB_USER || "root",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "sctec",
    password: process.env.DB_PASSWORD || "",
    port: parseInt(process.env.DB_PORT || "5432"),
});

export const initDatabase = async () => {
    await pool.query(`SELECT 1`);
}