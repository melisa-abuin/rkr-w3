export interface DiscordData {
  data: {
    approximateMemberCount?: string
    approximatePresenceCount?: string
  } | null
  error: string | null
  loading: boolean
}
