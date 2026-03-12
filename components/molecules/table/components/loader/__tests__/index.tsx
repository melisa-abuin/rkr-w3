import { screen } from '@testing-library/react'
import Loader from '..'
import { renderWithTheme } from '@/utils/renderWithTheme'

describe('Loader', () => {
  it('renders the correct number of rows', () => {
    renderWithTheme(<Loader columns={3} rows={5} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(5)
  })

  it('renders the correct number of cells per row', () => {
    renderWithTheme(<Loader columns={4} rows={3} />)

    const rows = screen.getAllByRole('row')
    rows.forEach((row) => {
      const cells = row.querySelectorAll('td')
      expect(cells).toHaveLength(4)
    })
  })

  it('renders the correct total number of cells', () => {
    renderWithTheme(<Loader columns={3} rows={4} />)

    const cells = screen.getAllByRole('cell')
    expect(cells).toHaveLength(12)
  })
})
