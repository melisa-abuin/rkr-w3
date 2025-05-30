import { screen } from '@testing-library/react'
import LoaderCard from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('LoaderCard', () => {
  it('renders  5 rows', () => {
    renderWithTheme(
      <table>
        <tbody>
          <LoaderCard />
        </tbody>
      </table>,
    )

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(25)
  })

  it('each row contains 2 cells', () => {
    renderWithTheme(
      <table>
        <tbody>
          <LoaderCard />
        </tbody>
      </table>,
    )

    const rows = screen.getAllByRole('row')
    rows.forEach((row) => {
      const cells = row.querySelectorAll('td')
      expect(cells).toHaveLength(2)
    })
  })
})
