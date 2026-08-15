import type { AnnouncementData } from '@rkr/dls/interfaces/announcement'
import pool from './db'

export type { AnnouncementData }

export async function getAnnouncement(): Promise<AnnouncementData | undefined> {
  try {
    const { rows } = await pool.query(
      'SELECT title, subtitle, is_active FROM announcement WHERE id = 1',
    )
    if (!rows[0]) return undefined

    return {
      title: rows[0].title,
      subtitle: rows[0].subtitle,
      isActive: rows[0].is_active,
    }
  } catch (e) {
    console.error(e)
    return undefined
  }
}
