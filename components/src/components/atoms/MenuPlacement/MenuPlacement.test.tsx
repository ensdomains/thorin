import * as React from 'react'

import { cleanup, render, screen, waitFor } from '@/test'

import { MenuPlacement } from './MenuPlacement'

const MenuPlacementExample = ({ usePortal }: { usePortal?: boolean }) => {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const controlRef = React.useRef<HTMLDivElement>(null)
  return (
    <div data-testid="root" ref={rootRef}>
      <div data-testid="control" ref={controlRef}>
        <MenuPlacement
          {...{
            appendTo: usePortal ? rootRef.current : undefined,
            control: usePortal ? controlRef.current : undefined,
          }}
        >
          <div data-testid="child">Menu</div>
        </MenuPlacement>
      </div>
    </div>
  )
}

describe('<MenuPlacement />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<MenuPlacementExample />)
    expect(screen.getByTestId('root')).toBeInTheDocument()
    expect(screen.getByTestId('control')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('should be a child of control if it is not using portal', () => {
    render(<MenuPlacementExample />)
    const control = screen.getByTestId('control')
    const child = screen.getByTestId('child')
    expect(child.parentElement).toBe(control)
  })

  it('should be a child of root if it is using portal', () => {
    render(<MenuPlacementExample usePortal />)
    const root = screen.getByTestId('root')
    const child = screen.getByTestId('child')
    waitFor(() => {
      expect(child.parentElement).toBe(root)
    })
  })
})
