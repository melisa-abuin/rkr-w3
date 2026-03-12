import { useMutation } from '@tanstack/react-query'

export const useDownloadStats = () =>
  useMutation({
    mutationFn: async (battletag: string) => {
      const response = await fetch(
        `/api/downloadPlayerStats/${encodeURIComponent(battletag)}`,
      )

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`)
      }

      return await response.blob()
    },
  })
