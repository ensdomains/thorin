import * as React from 'react'
import { useState } from 'react'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { RadioButton } from './RadioButton'

const RadioWithState = React.forwardRef(({ ...props }: any, ref) => {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <div>
      hello there
      {checked ? <div>checked</div> : <div>unchecked</div>}
      <RadioButton
        {...props}
        id="radio-id"
        label="radio-label"
        ref={ref}
        onChange={(e) => {
          setChecked(e.target.checked)
        }}
      />
    </div>
  )
})

describe('<Radio />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<RadioButton label="radio" name="name" value="10" />)
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  it(`should update state when checked`, async () => {
    render(<RadioWithState />)
    await userEvent.click(screen.getByTestId('radio'))
    await waitFor(() => {
      expect(screen.queryByText('checked')).toBeInTheDocument()
    })
  })

  it('should not be clickable when disabled', async () => {
    render(<RadioWithState disabled />)
    await userEvent.click(screen.getByTestId('radio'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should update when label text is clicked', async () => {
    render(<RadioWithState />)
    await userEvent.click(screen.getByText('radio-label'))
    await waitFor(() => {
      expect(screen.queryByText('checked')).toBeInTheDocument()
    })
  })

  it('should not update when label text is clicked and IS disabled', async () => {
    render(<RadioWithState disabled />)
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(<RadioWithState ref={ref} />)
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  it('should display the label on the right of the form element if labelRight is true', async () => {
    render(<RadioWithState />)
    expect(screen.getByText('radio-label')).toBeInTheDocument()
  })
})
