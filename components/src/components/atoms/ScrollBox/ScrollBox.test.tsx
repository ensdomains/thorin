import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, fireEvent, render, screen } from '@/test'
import 'jest-styled-components'

import { ScrollBox } from './ScrollBox'
import { lightTheme } from '@/src/tokens'

const Component = () => (
  <ThemeProvider theme={lightTheme}>
    <ScrollBox data-testid="scroll-box" style={{ height: '50px' }}>
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
  </ThemeProvider>
)

const mockScrolls = (
  scrollHeight: number,
  scrollTop: number,
  clientHeight: number,
) => {
  jest
    .spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
    .mockImplementation(() => scrollHeight)
  jest
    .spyOn(HTMLElement.prototype, 'scrollTop', 'get')
    .mockImplementation(() => scrollTop)
  jest
    .spyOn(HTMLElement.prototype, 'clientHeight', 'get')
    .mockImplementation(() => clientHeight)
}

const expectScroll = (e: 'top' | 'bottom', visible: boolean) =>
  expect(screen.getByTestId('scroll-box')).toHaveStyleRule(
    'background-color',
    `rgba(0,0,0,${visible ? '0.1' : '0'})`,
    {
      modifier: e === 'top' ? '::before' : '::after',
    },
  )

describe('<ScrollBox />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Component />)
    expect(screen.getByTestId('scroll-box')).toBeInTheDocument()
  })
  it('should show only bottom line when scroll at top', () => {
    mockScrolls(100, 0, 50)
    render(<Component />)
    expectScroll('top', false)
    expectScroll('bottom', true)
  })
  it('should only show top line when scroll at bottom', () => {
    mockScrolls(100, 50, 50)
    render(<Component />)
    expectScroll('top', true)
    expectScroll('bottom', false)
  })
  it('should show both lines when scroll at middle', () => {
    mockScrolls(100, 25, 50)
    render(<Component />)
    expectScroll('top', true)
    expectScroll('bottom', true)
  })
  it('should change on scroll', () => {
    mockScrolls(100, 0, 50)
    render(<Component />)
    expectScroll('top', false)
    expectScroll('bottom', true)
    mockScrolls(100, 50, 50)
    fireEvent.scroll(screen.getByTestId('scroll-box'))
    expectScroll('top', true)
    expectScroll('bottom', false)
  })
})
