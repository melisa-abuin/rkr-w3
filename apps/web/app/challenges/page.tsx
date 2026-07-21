import CardsContainer from '@rkr/dls/components/atoms/cardsContainer'
import PageContainer from '@rkr/dls/components/atoms/pageContainer'
import PageHeader from '@rkr/dls/components/atoms/pageHeader'
import AwardDetail from '@rkr/dls/components/molecules/awardDetail'
import Error from '@rkr/dls/components/molecules/error'
import RowCard from '@rkr/dls/components/molecules/rowCard'
import { awardsStatsApi } from '@rkr/dls/constants'
import { Award, AwardsDataFormatted } from '@rkr/dls/interfaces/award'
import { formatAwardsByCategory } from '@rkr/dls/utils/formatGameAwards'

async function fetchData(): Promise<{
  data: AwardsDataFormatted | null
  error: string | null
}> {
  const response = await fetch(awardsStatsApi, {
    next: { revalidate: 480 },
  })

  if (response.status === 200) {
    const result = (await response.json()) as Award[]
    return {
      data: formatAwardsByCategory(result),
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
            <PageHeader
              description="In-game challenges players can complete to earn rewards and prove their skills."
              title="Challenges"
            />
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
