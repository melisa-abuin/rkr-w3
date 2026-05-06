import { PageContainer } from '@/components/atoms/pageContainer'
import PageHeader from '@/components/atoms/pageHeader'
import { getBaseUrlFromHeaders } from '@/utils/getBaseUrlFromHeaders'
import Error from '@/components/molecules/error'
import CardsContainer from '@/components/atoms/cardsContainer'
import RowCard from '@/components/molecules/rowCard'
import AwardDetail from '@/components/molecules/awardDetail'
import { AwardsData } from '@/interfaces/award'

async function fetchData(): Promise<{
  data: AwardsData | null
  error: string | null
}> {
  const url = await getBaseUrlFromHeaders()

  const response = await fetch(`${url}/api/awards`)
  if (response.status === 200) {
    return {
      data: (await response.json()) as AwardsData,
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
