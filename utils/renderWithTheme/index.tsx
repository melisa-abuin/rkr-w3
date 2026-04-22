import { render } from '@testing-library/react'
import { ReactNode } from 'react'

const renderWithTheme = (ui: ReactNode) => {
  return render(ui)
}

export { renderWithTheme }
