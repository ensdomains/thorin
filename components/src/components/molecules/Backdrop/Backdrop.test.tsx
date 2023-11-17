import * as React from 'react'

import { cleanup, render, screen, waitFor } from '@/test'

import { Backdrop } from './Backdrop'

window.scroll = jest.fn()

const Element = ({
  open = true,
  className,
  testId = 1,
}: {
  open?: boolean
  className?: string
  testId?: number
}) => (
  <Backdrop className={className} open={open}>
    {() => <div data-testid={`inner-data-${testId}`}>test</div>}
  </Backdrop>
)

describe('<Backdrop />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<Element />)
    await waitFor(() =>
      expect(screen.getByTestId('inner-data-1')).toBeInTheDocument(),
    )
  })
  it('should allow multiple backdrops to open without losing the initial state', async () => {
    const { rerender: rerenderOne } = render(<Element />)
    await waitFor(() =>
      expect(screen.getByTestId('inner-data-1')).toBeInTheDocument(),
    )
    expect(document.body.dataset.backdrops).toBe('1')
    expect(document.body.style.position).toBe('fixed')
    const { rerender: rerenderTwo } = render(<Element testId={2} />)
    await waitFor(() =>
      expect(screen.getByTestId('inner-data-2')).toBeInTheDocument(),
    )
    expect(document.body.dataset.backdrops).toBe('2')
    expect(document.body.style.position).toBe('fixed')
    rerenderTwo(<Element open={false} testId={2} />)
    await waitFor(() =>
      expect(screen.queryByTestId('inner-data-2')).not.toBeInTheDocument(),
    )
    expect(document.body.dataset.backdrops).toBe('1')
    expect(document.body.style.position).toBe('fixed')
    rerenderOne(<Element open={false} />)
    await waitFor(() =>
      expect(screen.queryByTestId('inner-data-1')).not.toBeInTheDocument(),
    )
    expect(document.body.dataset.backdrops).toBe('0')
    expect(document.body.style.position).toBe('')
  })
})
