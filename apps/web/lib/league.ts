import type { LeagueGuide } from '@rkr/dls/interfaces/league'
import pool from './db'

export async function getLeague(): Promise<LeagueGuide | undefined> {
  try {
    const { rows } = await pool.query(
      'SELECT title, content, is_active FROM league WHERE id = 1',
    )
    if (!rows[0]) return undefined

    return {
      title: rows[0].title,
      content: rows[0].content,
      isActive: rows[0].is_active,
    }
  } catch (e) {
    console.error(e)
    return undefined
  }
}
