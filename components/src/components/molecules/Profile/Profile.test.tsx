import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Profile } from './Profile'

const TEST_ADDRESS = '0x155097452fc6aefab3df09ca314c71bfc60ccb92'

describe('<Profile />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Profile address="" />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('profile')).toBeInTheDocument()
  })

  it('should add middle ellipsis to address', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Profile address={TEST_ADDRESS} />
      </ThemeProvider>,
    )
    const addressDisplay = screen.getByTestId('profile-address')
    expect(addressDisplay.innerHTML).toEqual('0x155...ccb92')
  })

  it('should display dropdown if items are provided', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Profile
          address={TEST_ADDRESS}
          dropdownItems={[
            { label: 'Disconnect', onClick: () => null, color: 'red' },
          ]}
          ensName="nick.eth"
        />
      </ThemeProvider>,
    )
    userEvent.click(screen.getByText('nick.eth'))
    expect(screen.queryByText('Disconnect')).toBeVisible()
  })

  it('should hide text if size is small', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Profile address={TEST_ADDRESS} ensName="nick.eth" size="small" />
      </ThemeProvider>,
    )
    expect(screen.queryByText('nick.eth')).not.toBeVisible()
  })
})
