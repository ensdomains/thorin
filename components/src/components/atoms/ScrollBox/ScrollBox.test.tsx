import * as React from 'react'

import {
  cleanup,
  getPropertyValue,
  makeMockIntersectionObserver,
  render,
  screen,
} from '@/test'

import { ScrollBox } from './ScrollBox'

const Component = ({ onReachedTop }: { onReachedTop?: () => void }) => (
  <>
    <ScrollBox
      data-testid="scroll-box"
      style={{ height: '50px' }}
      onReachedTop={onReachedTop}
    >
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
        <li>Item 7</li>
        <li>Item 8</li>
        <li>Item 9</li>
        <li>Item 10</li>
      </ul>
    </ScrollBox>
    <div data-testid="test123" />
  </>
)

const mockIntersectionObserverCls = vi.fn()
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

const mockIntersectionObserver = makeMockIntersectionObserver(
  mockIntersectionObserverCls,
  mockObserve,
  mockDisconnect,
)

const expectLine = (e: 'top' | 'bottom', visible: boolean) => {
  const test = getPropertyValue(
    screen.getByTestId(`scrollbox-${e}-divider`),
    'visibility',
  )
  expect(test).toEqual(visible ? 'visible' : 'hidden')
}

describe('<ScrollBox />', () => {
  afterEach(cleanup)

  it('renders', () => {
    mockIntersectionObserver(false, false)
    render(<Component />)
    expect(screen.getByTestId('scroll-box')).toBeInTheDocument()
  })
  it('should show only bottom line when intersecting with top', () => {
    mockIntersectionObserver(true, false)
    render(<Component />)
  })
  it('should only show top line when intersecting with bottom', () => {
    mockIntersectionObserver(false, true)
    render(<Component />)
    expectLine('top', true)
    expectLine('bottom', false)
  })
  it('should show both lines neither intersecting', () => {
    mockIntersectionObserver(false, false)
    render(<Component />)
    expectLine('top', true)
    expectLine('bottom', true)
  })
  it('should show nothing when both lines intersecting', () => {
    mockIntersectionObserver(true, true)
    render(<Component />)
    expectLine('top', false)
    expectLine('bottom', false)
  })
  it('should show most recent intersection if multiple updates', () => {
    let cb: (entries: Pick<IntersectionObserverEntry, 'isIntersecting' | 'target' | 'time'>[]) => void
    mockIntersectionObserverCls.mockImplementation((callback: typeof cb) => {
      cb = callback
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
      }
    })
    const els: HTMLElement[] = []
    window.IntersectionObserver = mockIntersectionObserverCls
    mockObserve.mockImplementation((el: HTMLElement) => {
      els.push(el)
      if (els.length === 2) {
        cb([
          ...els.map(el => ({
            isIntersecting: false,
            target: el,
            time: 100,
          })),
          ...els.map(el => ({
            isIntersecting: true,
            target: el,
            time: 1000,
          })),
        ])
      }
    })

    mockIntersectionObserver(true, true)
    render(<Component />)
    expectLine('top', false)
    expectLine('bottom', false)
  })
  it('should fire callback on intersection', () => {
    mockIntersectionObserver(true, false)
    const onReachedTop = vi.fn()
    render(<Component onReachedTop={onReachedTop} />)
    expect(onReachedTop).toHaveBeenCalled()
  })
})
