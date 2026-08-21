import pool from './db'

export interface AnnouncementData {
  title: string
  subtitle: string
  isActive: boolean
}

const emptyAnnouncement: AnnouncementData = {
  title: '',
  subtitle: '',
  isActive: false,
}

export async function getAnnouncement(): Promise<AnnouncementData> {
  try {
    const { rows } = await pool.query(
      'SELECT title, subtitle, is_active FROM announcement WHERE id = 1',
    )

    if (!rows[0]) return emptyAnnouncement

    return {
      title: rows[0].title as string,
      subtitle: rows[0].subtitle as string,
      isActive: rows[0].is_active as boolean,
    }
  } catch (e) {
    console.error(e)
    return emptyAnnouncement
  }
}
