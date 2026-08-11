import { Pool } from 'pg'

// Run once to initialize the sessions table:
// CREATE TABLE IF NOT EXISTS admin_sessions (
//   token TEXT PRIMARY KEY,
//   user_id TEXT NOT NULL,
//   username TEXT NOT NULL,
//   avatar TEXT,
//   expires_at TIMESTAMPTZ NOT NULL
// );

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export default pool
