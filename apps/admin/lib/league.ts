import type { LeagueGuide } from '@rkr/dls/interfaces/league'
import pool from './db'

const emptyLeague: LeagueGuide = {
  title: '',
  content: '',
  isActive: false,
}

export async function getLeague(): Promise<LeagueGuide> {
  try {
    const { rows } = await pool.query(
      'SELECT title, content, is_active FROM league WHERE id = 1',
    )
    if (!rows[0]) return emptyLeague

    return {
      title: rows[0].title,
      content: rows[0].content,
      isActive: rows[0].is_active,
    }
  } catch (e) {
    console.error(e)
    return emptyLeague
  }
}
