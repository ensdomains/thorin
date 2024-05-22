import * as React from 'react'
import { useState } from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { lightTheme } from '@/src/tokens'

import { RadioButton } from './RadioButton'

const RadioWithState = (props: any) => {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        hello there
        {checked ? <div>checked</div> : <div>unchecked</div>}
        <RadioButton
          id="radio-id"
          label="radio-label"
          ref={props.inputRef}
          onChange={(e) => {
            setChecked(e.target.checked)
          }}
          {...props}
        />
      </div>
    </ThemeProvider>
  )
}

describe('<Radio />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <RadioButton label="radio" name="name" value="10" />
      </ThemeProvider>,
    )
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
    await userEvent.click(screen.getByText('radio-label'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(<RadioWithState inputRef={ref} />)
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  it('should display the label on the right of the form element if labelRight is true', async () => {
    render(<RadioWithState labelRight />)
    expect(screen.getByText('radio-label')).toBeInTheDocument()
  })
})
