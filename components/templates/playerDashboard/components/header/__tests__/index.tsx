import { renderWithClient } from '@/mocks/testUtils'
import { screen } from '@testing-library/react'
import Header from '..'

vi.mock('@/hooks/useQueryErrorToast')

vi.mock('@/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils')>()
  return {
    ...actual,
    formatKeyToWord: vi.fn((key) => `Formatted ${key}`),
    hexToRgba: vi.fn((hex, alpha) => `rgba-from-${hex}-alpha-${alpha}`),
  }
})

describe('<Header />', () => {
  const defaultProps = {
    battleTag: 'HuntresKitty#1234',
    title: 'Test Title',
    color: 'red',
    skin: 'HuntresKitty',
  } as const

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the title', async () => {
    renderWithClient(<Header {...defaultProps} />)
    expect(await screen.findByText('Test Title')).toBeInTheDocument()
  })

  it('renders the formatted skin badge', async () => {
    renderWithClient(<Header {...defaultProps} />)
    expect(
      await screen.findByText('Formatted HuntresKitty'),
    ).toBeInTheDocument()
  })

  it('renders the color badge with correct text and style', async () => {
    renderWithClient(<Header {...defaultProps} />)
    expect(await screen.findByText('red kitty')).toBeInTheDocument()
  })

  it('does not render skin badge if skin is not provided', async () => {
    renderWithClient(<Header {...defaultProps} skin="" />)
    await screen.findByText('Test Title')
    expect(screen.queryByText(/Formatted/)).not.toBeInTheDocument()
  })

  it('does not render color badge if color is not provided', async () => {
    renderWithClient(<Header {...defaultProps} color={null} />)
    await screen.findByText('Test Title')
    expect(screen.queryByText(/^red kitty$/)).not.toBeInTheDocument()
  })
})
