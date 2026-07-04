import { useApiQuery } from '@/hooks/useApiQuery'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlayerFinder from '..'

vi.mock('@/hooks/useApiQuery')
vi.mock('@/hooks/useQueryErrorToast')
vi.mock('@/hooks/useDebouncedValue', () => ({
  useDebouncedValue: vi.fn((value: string) => value),
}))
vi.mock('@/hooks/useOutsideClick', () => ({
  useOutsideClick: vi.fn(),
}))

const mockUseApiQuery = vi.mocked(useApiQuery)

describe('PlayerFinder', () => {
  const onClear = vi.fn()
  const onPlayerSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseApiQuery.mockImplementation((_url, params) => ({
      data:
        params?.battleTag === 'zzz'
          ? []
          : params?.battleTag
            ? [{ battleTag: 'Alpha#1234' }]
            : undefined,
      isFetching: false,
      error: null,
    }))
  })

  it('renders with the default placeholder', () => {
    render(<PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />)

    expect(screen.getByPlaceholderText('Search a player')).toBeInTheDocument()
  })

  it('calls custom onChange when provided', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <PlayerFinder
        onChange={onChange}
        onClear={onClear}
        onPlayerSelect={onPlayerSelect}
      />,
    )

    await user.type(screen.getByRole('textbox'), 'abc')

    expect(onChange).toHaveBeenCalled()
  })

  it('shows options and selects a player', async () => {
    const user = userEvent.setup()

    render(<PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.type(input, 'alph')

    const option = await screen.findByText('Alpha#1234')
    await user.click(option)

    expect(onPlayerSelect).toHaveBeenCalledWith('Alpha#1234')
    expect(screen.getByDisplayValue('Alpha#1234')).toBeInTheDocument()
    expect(screen.queryByText('Alpha#1234')).not.toBeInTheDocument()
  })

  it('shows no results for an empty response', async () => {
    const user = userEvent.setup()

    render(<PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.type(input, 'zzz')

    expect(await screen.findByText('No results')).toBeInTheDocument()
  })

  it('clears the query and calls onClear', async () => {
    const user = userEvent.setup()

    render(<PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'alpha')
    await user.click(screen.getByRole('button'))

    expect(onClear).toHaveBeenCalledTimes(1)
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
  })
})
