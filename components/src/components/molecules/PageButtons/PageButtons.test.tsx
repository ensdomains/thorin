import * as React from 'react'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { PageButtons } from './PageButtons'

const ButtonsHelper = ({
  mockCallback,
  ...props
}: Omit<React.ComponentProps<typeof PageButtons>, 'onChange'> & {
  mockCallback: (value: number) => void
}) => {
  return (
    <div>
      <div>outside</div>
      <PageButtons
        {...{ ...props, onChange: (value) => mockCallback(value) }}
      />
    </div>
  )
}

describe('<PageButtons />', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(
      <ButtonsHelper current={1} mockCallback={(_) => void 0} total={100} />,
    )
    expect(screen.getByTestId('pagebuttons')).toBeInTheDocument()
  })

  it('should show correct default max buttons', () => {
    render(
      <ButtonsHelper current={1} mockCallback={(_) => void 0} total={100} />,
    )
    expect(screen.getAllByTestId('pagebutton').length).toBe(5)
  })
  it('should show correct custom max buttons', () => {
    render(
      <ButtonsHelper
        current={1}
        max={10}
        mockCallback={(_) => void 0}
        total={100}
      />,
    )
    expect(screen.getAllByTestId('pagebutton').length).toBe(10)
  })
  it('should show first and last buttons if specified', () => {
    render(
      <ButtonsHelper
        alwaysShowFirst
        alwaysShowLast
        current={50}
        mockCallback={(_) => void 0}
        total={100}
      />,
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })
  it('should not show first and last buttons if specified', () => {
    render(
      <ButtonsHelper current={50} mockCallback={(_) => void 0} total={100} />,
    )
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.queryByText('100')).not.toBeInTheDocument()
  })
  it('should show dots if alwaysShowFirst/alwaysShowLast is specified', () => {
    render(
      <ButtonsHelper
        alwaysShowFirst
        alwaysShowLast
        current={50}
        mockCallback={(_) => void 0}
        total={100}
      />,
    )
    expect(screen.getAllByTestId('pagebutton-dots').length).toBe(2)
  })
  it('should show dots if alwaysShowFirst/alwaysShowLast is not specified', () => {
    render(
      <ButtonsHelper current={50} mockCallback={(_) => void 0} total={100} />,
    )
    expect(screen.getAllByTestId('pagebutton-dots').length).toBe(2)
  })
  it('should not show buttons past the total page count', () => {
    render(
      <ButtonsHelper current={100} mockCallback={(_) => void 0} total={100} />,
    )
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.queryByText('101')).not.toBeInTheDocument()
  })
  it('should call onChange method when button is clicked', async () => {
    const mockCallback = jest.fn()
    render(
      <ButtonsHelper current={1} mockCallback={mockCallback} total={100} />,
    )
    userEvent.click(screen.getByText('3'))
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(3)
    })
  })
})
