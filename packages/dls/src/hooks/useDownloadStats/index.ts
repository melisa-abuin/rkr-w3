import { apiUrl } from '@/constants'
import { formatSaveDataFile } from '@/utils'
import { useMutation } from '@tanstack/react-query'

export const useDownloadStats = () =>
  useMutation({
    mutationFn: async (playerId: string) => {
      const response = await fetch(
        `${apiUrl}/api/RawJson/${encodeURIComponent(playerId)}`,
      )

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`)
      }

      const json = await response.json()
      const formatted = formatSaveDataFile(JSON.stringify(json.raw_Json))
      return new Blob([formatted], { type: 'text/plain' })
    },
  })
