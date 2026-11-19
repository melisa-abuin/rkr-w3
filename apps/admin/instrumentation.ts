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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS page_views (
      id BIGSERIAL PRIMARY KEY,
      route TEXT NOT NULL,
      visitor_id TEXT NOT NULL,
      visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await pool.query(
    'ALTER TABLE page_views ADD COLUMN IF NOT EXISTS is_bot BOOLEAN NOT NULL DEFAULT FALSE',
  )

  await pool.query(
    'CREATE INDEX IF NOT EXISTS page_views_visited_at_idx ON page_views (visited_at)',
  )

  await pool.query(`
    DO $$
    BEGIN
      IF to_regclass('feedbacks') IS NOT NULL AND to_regclass('feedback') IS NULL THEN
        ALTER TABLE feedbacks RENAME TO feedback;
        ALTER INDEX IF EXISTS feedbacks_created_at_idx RENAME TO feedback_created_at_idx;
      END IF;
    END $$
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id BIGSERIAL PRIMARY KEY,
      type TEXT NOT NULL CHECK (type IN ('feedback', 'bug-report', 'feature-request')),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT 'Anonymous',
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'resolved')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await pool.query('ALTER TABLE feedback DROP COLUMN IF EXISTS visitor_id')

  await pool.query(
    'CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON feedback (created_at)',
  )
}
