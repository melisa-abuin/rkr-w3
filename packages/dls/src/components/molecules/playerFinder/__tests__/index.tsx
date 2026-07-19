import { playersApi } from '@/constants'
import { mockPlayerSearchResults } from '@/mocks/data/players'
import { server } from '@/mocks/server'
import { renderWithClient } from '@/mocks/testUtils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import PlayerFinder from '..'

vi.mock('@/hooks/useQueryErrorToast')
vi.mock('@/hooks/useDebouncedValue', () => ({
  useDebouncedValue: vi.fn((value: string) => value),
}))
vi.mock('@/hooks/useOutsideClick', () => ({
  useOutsideClick: vi.fn(),
}))

describe('PlayerFinder', () => {
  const onClear = vi.fn()
  const onPlayerSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    server.use(
      http.get(playersApi, () => HttpResponse.json(mockPlayerSearchResults)),
    )
  })

  it('renders with the default placeholder', () => {
    renderWithClient(
      <PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />,
    )

    expect(screen.getByPlaceholderText('Search a player')).toBeInTheDocument()
  })

  it('calls custom onChange when provided', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    renderWithClient(
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

    renderWithClient(
      <PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />,
    )

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

    renderWithClient(
      <PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />,
    )

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.type(input, 'zzz')

    expect(await screen.findByText('No results')).toBeInTheDocument()
  })

  it('clears the query and calls onClear', async () => {
    const user = userEvent.setup()

    renderWithClient(
      <PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />,
    )

    const input = screen.getByRole('textbox')
    await user.type(input, 'alpha')
    await user.click(screen.getByRole('button'))

    expect(onClear).toHaveBeenCalledTimes(1)
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
  })
})
