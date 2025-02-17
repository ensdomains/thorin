/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import type { RefObject } from 'react'
import { useState } from 'react'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Checkbox } from './Checkbox'

const CheckboxWithState = React.forwardRef((props: any, ref) => {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <div>
      hello there
      {checked ? <div>checked</div> : <div>unchecked</div>}
      <Checkbox
        {...props}
        aria-invalid="sdfasd"
        id="checkbox-id"
        label="checkbox-label"
        ref={ref}
        onChange={(e) => {
          setChecked(e.target.checked)
        }}
      />
    </div>
  )
})

describe('<Checkbox />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<Checkbox label="Checkbox" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it(`should update state when checked and unchecked`, async () => {
    render(<CheckboxWithState />)
    await userEvent.click(screen.getByTestId('checkbox'))
    await waitFor(() => {
      expect(screen.queryByText('checked')).toBeInTheDocument()
    })
    await userEvent.click(screen.getByTestId('checkbox'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should not be clickable when disabled', async () => {
    render(<CheckboxWithState disabled />)
    await userEvent.click(screen.getByTestId('checkbox'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should update when label text is clicked', async () => {
    render(<CheckboxWithState />)
    await userEvent.click(screen.getByText('checkbox-label'))
    await waitFor(() => {
      expect(screen.queryByText('checked')).toBeInTheDocument()
    })
  })

  it('should not update when label text is clicked and IS disabled', async () => {
    render(<CheckboxWithState disabled />)
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as RefObject<any>
    render(<CheckboxWithState ref={ref} />)
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })
})
