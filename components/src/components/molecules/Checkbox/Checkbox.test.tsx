import * as React from 'react'
import { useState } from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Checkbox } from './Checkbox'
import { lightTheme } from '@/src/tokens'

const CheckboxWithState = (props: any) => {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        hello there
        {checked ? <div>checked</div> : <div>unchecked</div>}
        <Checkbox
          id="checkbox-id"
          label="checkbox-label"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setChecked(e.target.checked)
          }}
          {...props}
        />
      </div>
    </ThemeProvider>
  )
}

describe('<Checkbox />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Checkbox label="Checkbox" />
      </ThemeProvider>,
    )
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it(`should update state when checked and unchecked`, async () => {
    render(<CheckboxWithState />)
    userEvent.click(screen.getByTestId('checkbox'))
    await waitFor(() => {
      expect(screen.queryByText('checked')).toBeInTheDocument()
    })
    userEvent.click(screen.getByTestId('checkbox'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should not be clickable when disabled', async () => {
    render(<CheckboxWithState disabled />)
    userEvent.click(screen.getByTestId('checkbox'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should update when label text is clicked', async () => {
    render(<CheckboxWithState />)
    userEvent.click(screen.getByText('checkbox-label'))
    await waitFor(() => {
      expect(screen.queryByText('checked')).toBeInTheDocument()
    })
  })

  it('should not update when label text is clicked and IS disabled', async () => {
    render(<CheckboxWithState disabled />)
    userEvent.click(screen.getByText('checkbox-label'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })
})
