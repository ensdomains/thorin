import * as React from 'react'

import {
  cleanup,
  getPropertyValue,
  render,
  screen,
  userEvent,
  waitFor,
} from '@/test'

import { Profile } from './Profile'

const TEST_ADDRESS = '0x155097452fc6aefab3df09ca314c71bfc60ccb92'

describe('<Profile />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<Profile address="" />)
    expect(screen.getByTestId('profile')).toBeInTheDocument()
  })

  it('should add middle ellipsis to address', () => {
    render(<Profile address={TEST_ADDRESS} />)
    const addressDisplay = screen.getByTestId('profile-title')
    expect(addressDisplay.innerHTML).toEqual('0x155...ccb92')
  })

  it('should display only ensName if provided', () => {
    render(<Profile address={TEST_ADDRESS} ensName="nick.eth" />)
    const addressDisplay = screen.getByTestId('profile-title')
    expect(addressDisplay.innerHTML).toEqual('nick.eth')
  })

  it('should display dropdown if items are provided', async () => {
    render(
      <Profile
        address={TEST_ADDRESS}
        dropdownItems={[
          { label: 'Disconnect', onClick: () => null, color: 'red' },
        ]}
        ensName="nick.eth"
      />,
    )
    await userEvent.click(screen.getByText('nick.eth'))
    await waitFor(() => {
      expect(screen.queryByText('Disconnect')).toBeVisible()
    })
  })

  it('should hide text if size is small', () => {
    render(<Profile address={TEST_ADDRESS} ensName="nick.eth" size="small" />)
    const display = getPropertyValue(
      screen.getByTestId('profile-inner-container'),
      'display',
    )
    expect(display).toEqual('none')
  })
})
