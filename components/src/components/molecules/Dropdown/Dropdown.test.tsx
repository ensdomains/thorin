import * as React from 'react'

import {
  cleanup,
  getPropertyValue,
  makeMockIntersectionObserver,
  render,
  screen,
  userEvent,
  waitFor,
} from '@/test'

import { Dropdown } from './Dropdown'

const getVisibilityValue = () =>
  getPropertyValue(screen.getByTestId('popoverContainer'), 'visibility')

const DropdownHelper = ({ mockCallback, children, ...props }: any) => {
  return (
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
  )
}

const mockIntersectionObserverCls = jest.fn()
const mockObserve = jest.fn()
const mockDisconnect = jest.fn()

const mockIntersectionObserver = makeMockIntersectionObserver(
  mockIntersectionObserverCls,
  mockObserve,
  mockDisconnect,
)

describe('<Dropdown />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<DropdownHelper />)
    expect(screen.getByTestId('dropdown-btn')).toBeInTheDocument()
  })

  it('should show dropdown when clicked', async () => {
    render(<DropdownHelper label="Menu" />)
    userEvent.click(screen.getByText('Menu'))
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeVisible()
    })
  })

  it('should call dropdown item callback when clicked', async () => {
    const mockCallback = jest.fn()
    render(<DropdownHelper {...{ mockCallback, label: 'Menu' }} />)
    userEvent.click(screen.getByText('Menu'))
    await waitFor(() => userEvent.click(screen.getByText('Dashboard')))
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })

  it('should close if clicking outside of dropdown', async () => {
    render(<DropdownHelper label="Menu" />)

    expect(getVisibilityValue()).toEqual('hidden')

    await userEvent.click(screen.getByText('Menu'))
    await waitFor(() => {
      expect(getVisibilityValue()).toBe('visible')
    })

    await userEvent.click(screen.getByText('outside'))
    await waitFor(() => {
      expect(getVisibilityValue()).toBe('hidden')
    })
  })

  it('should close dropdown if button is clicked when open', async () => {
    render(<DropdownHelper label="Menu" />)
    expect(getVisibilityValue()).toEqual('hidden')

    await userEvent.click(screen.getByText('Menu'))
    await waitFor(() => {
      expect(getVisibilityValue()).toBe('visible')
    })

    await userEvent.click(screen.getByText('Menu'))
    await waitFor(() => {
      expect(getVisibilityValue()).toBe('hidden')
    })
  })

  it('should render custom element when passed in', () => {
    render(
      <DropdownHelper>
        <button>custom</button>
      </DropdownHelper>,
    )
    expect(screen.queryByText('custom')).toBeVisible()
  })

  it('should open and close dropdown when custom button is provided', async () => {
    render(
      <DropdownHelper>
        <button>custom</button>
      </DropdownHelper>,
    )
    expect(getVisibilityValue()).toEqual('hidden')

    await userEvent.click(screen.getByText('custom'))
    await waitFor(() => {
      expect(getVisibilityValue()).toBe('visible')
    })

    await userEvent.click(screen.getByText('custom'))
    await waitFor(() => expect(getVisibilityValue()).toBe('hidden'))
  })

  it('should not error if no dropdown items are passed in', () => {
    render(
      <>
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-ignore*/}
        <Dropdown label="" />
      </>,
    )
    expect(screen.getByTestId('dropdown-btn')).toBeInTheDocument()
  })

  it('should use scrollbox if height is passed in', async () => {
    mockIntersectionObserver(true, false)
    render(<DropdownHelper height={100} label="menu" />)
    userEvent.click(screen.getByText('menu'))
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeVisible()
    })
    expect(screen.getByTestId('scrollbox-bottom-intersect')).toBeVisible()
  })
})
