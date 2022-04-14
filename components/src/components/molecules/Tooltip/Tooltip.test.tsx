import * as React from 'react'

import styled, { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Tooltip, TooltipProps } from './Tooltip'

const TooltipButton = styled.button<TooltipProps['children']>`
  ${({ open }) => (open ? `background: red;` : `background: white;`)}
`
const TooltipHelper = ({ ...props }: any) => {
  const content = <div data-testid="tooltipcontent">Content</div>
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <div>
        <div>outside</div>
        <Tooltip content={content} {...props}>
          <TooltipButton data-testid="tooltipbutton">Click me</TooltipButton>
        </Tooltip>
      </div>
    </ThemeProvider>
  )
}

describe('<Tooltip />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<TooltipHelper />)
    expect(screen.getByTestId('dynamicpopover')).toBeInTheDocument()
    expect(screen.getByTestId('tooltipbutton')).toBeInTheDocument()
    expect(screen.getByTestId('tooltipcontent')).toBeInTheDocument()
  })

  it('should show popover when clicked', () => {
    render(<TooltipHelper />)
    userEvent.click(screen.getByTestId('tooltipbutton'))
    expect(screen.getByTestId('tooltipcontent')).toBeVisible()
  })

  it('should close if clicking outside of dropdown', async () => {
    render(<TooltipHelper />)
    userEvent.click(screen.getByTestId('tooltipbutton'))
    userEvent.click(screen.getByText('outside'))
    await waitFor(() => {
      expect(screen.getByTestId('tooltipcontent')).not.toBeVisible()
    })
  })

  it('should close dropdown if button is clicked when open', () => {
    render(<TooltipHelper />)
    userEvent.click(screen.getByTestId('tooltipbutton'))
    userEvent.click(screen.getByTestId('tooltipbutton'))
    expect(screen.getByTestId('tooltipcontent')).not.toBeVisible()
  })
})
