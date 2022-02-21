import * as React from 'react'

import { cleanup, render, screen, userEvent } from '@/test'

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
    const addressDisplay = screen.getByRole('heading', { level: 4 })
    expect(addressDisplay.innerHTML).toEqual('0x155...ccb92')
  })

  it('should display dropdown if items are provided', () => {
    render(
      <Profile
        address={TEST_ADDRESS}
        dropdownItems={[
          { label: 'Disconnect', onClick: () => null, color: 'red' },
        ]}
        ensName="nick.eth"
      />,
    )
    userEvent.click(screen.getByText('nick.eth'))
    expect(screen.queryByText('Disconnect')).toBeVisible()
  })

  it('should hide text if size is small', () => {
    render(<Profile address={TEST_ADDRESS} ensName="nick.eth" size="small" />)
    expect(screen.queryByText('nick.eth')).not.toBeVisible()
  })
})
