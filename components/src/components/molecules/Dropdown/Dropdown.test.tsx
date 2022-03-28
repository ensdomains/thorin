import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Dropdown } from './Dropdown'

const DropdownHelper = ({ mockCallback, children, ...props }: any) => {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <div>
        <div>outside</div>
        <Dropdown
          {...{
            items: [
              { label: 'Dashboard', onClick: mockCallback },
              { label: 'Disconnect', onClick: () => null, color: 'red' },
            ],
            ...props,
          }}
        >
          {children}
        </Dropdown>
      </div>
    </ThemeProvider>
  )
}

describe('<Dropdown />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<DropdownHelper />)
    expect(screen.getByTestId('dropdown')).toBeInTheDocument()
  })

  it('should show dropdown when clicked', () => {
    render(<DropdownHelper label="Menu" />)
    userEvent.click(screen.getByText('Menu'))
    expect(screen.queryByText('Dashboard')).toBeVisible()
  })

  it('should call dropdown item callback when clicked', async () => {
    const mockCallback = jest.fn()
    render(<DropdownHelper {...{ mockCallback, label: 'Menu' }} />)
    userEvent.click(screen.getByText('Menu'))
    userEvent.click(screen.getByText('Dashboard'))
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })

  it('should close if clicking outside of dropdown', async () => {
    render(<DropdownHelper label="Menu" />)
    userEvent.click(screen.getByText('Menu'))
    userEvent.click(screen.getByText('outside'))
    await waitFor(() => {
      expect(screen.queryByText('Dashboard')).not.toBeVisible()
    })
  })

  it('should close dropdown if button is clicked when open', () => {
    render(<DropdownHelper label="Menu" />)
    userEvent.click(screen.getByText('Menu'))
    userEvent.click(screen.getByText('Menu'))
    expect(screen.queryByText('Dashboard')).not.toBeVisible()
  })

  it('should render custom element when passed in', () => {
    render(
      <DropdownHelper>
        <button>custom</button>
      </DropdownHelper>,
    )
    expect(screen.queryByText('custom')).toBeVisible()
  })

  it('should open and close dropdown when custom button is provided', () => {
    render(
      <DropdownHelper>
        <button>custom</button>
      </DropdownHelper>,
    )
    userEvent.click(screen.getByText('custom'))
    expect(screen.queryByText('Dashboard')).toBeVisible()
    userEvent.click(screen.getByText('custom'))
    expect(screen.queryByText('Dashboard')).not.toBeVisible()
  })

  it('sholud not error if no dropdown items are passed in', () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-ignore*/}
        <Dropdown label="" />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('dropdown')).toBeInTheDocument()
  })
})
