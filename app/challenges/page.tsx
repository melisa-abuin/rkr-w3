import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import Error from '@/components/molecules/error'
import CardsContainer from '@/components/atoms/cardsContainer'
import RowCard from '@/components/molecules/rowCard'
import AwardDetail from '@/components/molecules/awardDetail'
import { ApiAward, AwardsData } from '@/interfaces/award'
import { apiUrl } from '@/constants'
import { formatAwardsByCategory } from '@/utils/formatGameAwards'

async function fetchData(): Promise<{
  data: AwardsData | null
  error: string | null
}> {
  const response = await fetch(`${apiUrl}/api/Awards/stats`, {
    next: { revalidate: 480 },
  })

  if (response.status === 200) {
    const raw = (await response.json()) as ApiAward[]
    return {
      data: formatAwardsByCategory(raw),
      error: null,
    }
  }
  return {
    data: null,
    error: 'Something went wrong',
  }
}

export default async function ChallengesPage() {
  const { data, error } = await fetchData()
  return (
    <main>
      {error ? (
        <Error />
      ) : (
        data && (
          <PageContainer>
            <PageHeader description="" title="Challenges" />
            {data.map((award) => {
              return (
                <PageContainer
                  key={award.id}
                  marginBottom={16}
                  withPadding={false}
                >
                  <CardsContainer title={award.id} twoPerRow={true}>
                    {award.awards.map((challenge) => (
                      <RowCard key={challenge.title} variant="highlight">
                        <AwardDetail
                          description={challenge.description}
                          imagePath={challenge.imagePath}
                          percentage={challenge.percentage}
                          title={challenge.title}
                        />
                      </RowCard>
                    ))}
                  </CardsContainer>
                </PageContainer>
              )
            })}
          </PageContainer>
        )
      )}
    </main>
  )
}
