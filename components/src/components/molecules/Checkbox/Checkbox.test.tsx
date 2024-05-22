import * as React from 'react'
import { RefObject, useState } from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Checkbox } from './Checkbox'

const CheckboxWithState = (props: any) => {
  const [checked, setChecked] = useState<boolean>(false)
  console.log('props', props)
  return (
    <ThemeProvider theme={lightTheme}>
      <div>
        hello there
        {checked ? <div>checked</div> : <div>unchecked</div>}
        <Checkbox
          aria-invalid="sdfasd"
          id="checkbox-id"
          label="checkbox-label"
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

  it.only('should not update when label text is clicked and IS disabled', async () => {
    render(<CheckboxWithState disabled />)
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
    await userEvent.click(screen.getByText('checkbox-label'))
    await waitFor(() => {
      expect(screen.queryByText('unchecked')).toBeInTheDocument()
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as RefObject<any>
    render(<CheckboxWithState inputRef={ref} />)
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })
})
