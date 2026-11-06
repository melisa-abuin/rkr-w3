import { render, screen } from '@testing-library/react'
import TabsLoader from '..'

describe('TabsLoader', () => {
  it('renders the default number of tab loaders', () => {
    render(<TabsLoader />)

    expect(screen.getAllByRole('progressbar')).toHaveLength(3)
  })

  it('renders the given number of tab loaders', () => {
    render(<TabsLoader tabsCount={5} />)

    expect(screen.getAllByRole('progressbar')).toHaveLength(5)
  })

  it('renders the description and children', () => {
    render(
      <TabsLoader description="Some description">
        <p>Content</p>
      </TabsLoader>,
    )

    expect(screen.getByText('Some description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
