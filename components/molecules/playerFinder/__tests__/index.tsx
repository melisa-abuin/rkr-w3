import { renderWithTheme } from '@/utils/renderWithTheme'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlayerFinder from '..'
import { useApiQuery } from '@/hooks/useApiQuery'
import { Player } from '@/interfaces/player'

jest.mock('@/hooks/useApiQuery')
jest.mock('@/hooks/useQueryErrorToast')
jest.mock('@/hooks/useDebouncedValue', () => ({
  useDebouncedValue: jest.fn((value: string) => value),
}))
jest.mock('@/hooks/useOutsideClick', () => ({
  useOutsideClick: jest.fn(),
}))

const mockUseApiQuery = useApiQuery as jest.Mock

const playerMock = {
  battleTag: {
    name: 'Alpha',
    tag: 'Alpha#1234',
  },
} as Player

describe('PlayerFinder', () => {
  const onClear = jest.fn()
  const onPlayerSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseApiQuery.mockImplementation((_url, params) => ({
      data:
        params?.battleTag === 'zzz'
          ? []
          : params?.battleTag
            ? [playerMock]
            : undefined,
      isFetching: false,
      error: null,
    }))
  })

  it('renders with the default placeholder', () => {
    renderWithTheme(
      <PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />,
    )

    expect(screen.getByPlaceholderText('Search a player')).toBeInTheDocument()
  })

  it('calls custom onChange when provided', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    renderWithTheme(
      <PlayerFinder
        onClear={onClear}
        onPlayerSelect={onPlayerSelect}
        onChange={onChange}
      />,
    )

    await user.type(screen.getByRole('textbox'), 'abc')

    expect(onChange).toHaveBeenCalled()
  })

  it('shows options and selects a player', async () => {
    const user = userEvent.setup()

    renderWithTheme(
      <PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />,
    )

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.type(input, 'alph')

    const option = await screen.findByText('Alpha#1234')
    await user.click(option)

    expect(onPlayerSelect).toHaveBeenCalledWith(playerMock)
    expect(screen.getByDisplayValue('Alpha#1234')).toBeInTheDocument()
    expect(screen.queryByText('Alpha#1234')).not.toBeInTheDocument()
  })

  it('shows no results for an empty response', async () => {
    const user = userEvent.setup()

    renderWithTheme(
      <PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />,
    )

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.type(input, 'zzz')

    expect(await screen.findByText('No results')).toBeInTheDocument()
  })

  it('clears the query and calls onClear', async () => {
    const user = userEvent.setup()

    renderWithTheme(
      <PlayerFinder onClear={onClear} onPlayerSelect={onPlayerSelect} />,
    )

    const input = screen.getByRole('textbox')
    await user.type(input, 'alpha')
    await user.click(screen.getByRole('button'))

    expect(onClear).toHaveBeenCalledTimes(1)
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
  })
})
