import * as React from 'react'
import { useState } from 'react'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { RadioButton } from './RadioButton'

const RadioWithState = (props: any) => {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <div>
      hello there
      {checked ? <div>checked</div> : <div>unchecked</div>}
      <RadioButton
        id="radio-id"
        label="radio-label"
        onChange={(e) => {
          setChecked(e.target.checked)
        }}
        {...props}
      />
    </div>
  )
}

describe('<Radio />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<RadioButton label="radio" name="name" value={10} />)
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  it(`should update state when checked`, async () => {
    render(<RadioWithState />)
    userEvent.click(screen.getByTestId('radio'))
    await waitFor(() => {
      expect(screen.queryByText('checked')).toBeInTheDocument()
    })
  })

  it('should not be clickable when disabled', async () => {
    render(<RadioWithState disabled />)
    userEvent.click(screen.getByTestId('radio'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should update when label text is clicked', async () => {
    render(<RadioWithState />)
    userEvent.click(screen.getByText('radio-label'))
    await waitFor(() => {
      expect(screen.queryByText('checked')).toBeInTheDocument()
    })
  })

  it('should not update when label text is clicked and IS disabled', async () => {
    render(<RadioWithState disabled />)
    userEvent.click(screen.getByText('radio-label'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })
})
