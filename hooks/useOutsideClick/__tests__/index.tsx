import React, { useRef } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useOutsideClick } from '..'

describe('useOutsideClick', () => {
  function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
    const ref = useRef<HTMLDivElement | null>(null)

    useOutsideClick(onOutsideClick, ref)

    return (
      <div>
        <div ref={ref} data-testid="inside">
          Inside
        </div>
        <div data-testid="outside">Outside</div>
      </div>
    )
  }

  it('should call callback when clicking outside the element', () => {
    const callback = jest.fn()
    const { getByText } = render(<TestComponent onOutsideClick={callback} />)

    fireEvent.mouseDown(getByText('Outside'))

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should not call callback when clicking inside the element', () => {
    const callback = jest.fn()
    const { getByText } = render(<TestComponent onOutsideClick={callback} />)

    fireEvent.mouseDown(getByText('Inside'))

    expect(callback).not.toHaveBeenCalled()
  })
})
