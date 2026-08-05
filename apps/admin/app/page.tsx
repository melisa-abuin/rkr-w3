import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'

export default function AdminPage() {
  return (
    <main>
      <PageContainer>
        <PageHeader
          description="Set up and manage the RKR website, including banners, events, and more."
          title="RKR Admin"
        />
      </PageContainer>
    </main>
  )
}
