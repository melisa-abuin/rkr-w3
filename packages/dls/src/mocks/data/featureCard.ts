import type { FeatureCardItem } from '@/components/organisms/featureCard'

export const mockFeatureCardItems: FeatureCardItem[] = [
  {
    imageSrc: '/awards/a.png',
    imageFallbackSrc: '/awards/fallback.png',
    label: 'Alpha',
    children: '1:00:00',
  },
  {
    imageSrc: '/awards/b.png',
    imageFallbackSrc: '/awards/fallback.png',
    label: 'Beta',
  },
  {
    imageSrc: '/awards/c.png',
    imageFallbackSrc: '/awards/fallback.png',
    label: 'Gamma',
    children: '2:00:00',
  },
]
