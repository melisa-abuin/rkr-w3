import { getLeague } from '@/lib/league'
import GuideTemplate from '@rkr/dls/components/templates/guide'

export default async function GuidePage() {
  const league = await getLeague()

  return <GuideTemplate league={league} />
}
