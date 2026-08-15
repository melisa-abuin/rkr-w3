export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const { default: pool } = await import('@/lib/db')

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      username TEXT NOT NULL,
      avatar TEXT,
      expires_at TIMESTAMPTZ NOT NULL
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS announcement (
      id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      title TEXT NOT NULL DEFAULT '',
      subtitle TEXT NOT NULL DEFAULT '',
      is_active BOOLEAN NOT NULL DEFAULT FALSE,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
}
