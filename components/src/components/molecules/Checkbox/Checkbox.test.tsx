import * as React from 'react'
import { useState } from 'react'

import { ThemeProvider } from 'styled-components'

import { useForm } from 'react-hook-form'

import { act } from 'react-dom/test-utils'

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
          onChange={(e) => {
            setChecked(e.target.checked)
          }}
          {...props}
        />
      </div>
    </ThemeProvider>
  )
}

const CheckboxWithForm = ({ submit }: { submit: (data: unknown) => void }) => {
  const { register, handleSubmit } = useForm<{
    component?: 'test'
  }>({
    defaultValues: {
      component: 'test',
    },
  })

  return (
    <ThemeProvider theme={lightTheme}>
      <form
        onSubmit={handleSubmit((data: any) => {
          console.log(JSON.stringify(data))
          console.log(JSON.stringify(data?.select))
          submit(data)
        })}
      >
        <div>outside</div>
        <Checkbox
          label="checkbox"
          {...register('component', { required: true })}
        />
        <input data-testid="submit" type="submit" />
      </form>
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

  /** React Form Hook Integration Tests */

  it('should call on blur when clicking outside of element', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <div>outside</div>
          <Checkbox label="component" value="test" onBlur={mockCallback} />
        </div>
      </ThemeProvider>,
    )
    act(() => {
      userEvent.click(screen.getByTestId('checkbox'))
    })
    act(() => {
      userEvent.click(screen.getByText('outside'))
    })
    await waitFor(() => {
      expect(mockCallback).toBeCalledTimes(1)
    })
  })

  it('should work with react-form-hook', async () => {
    const mockSubmit = jest.fn()

    render(<CheckboxWithForm submit={mockSubmit} />)
    act(() => {
      userEvent.click(screen.getByTestId('checkbox'))
    })

    act(() => {
      userEvent.click(screen.getByTestId('submit'))
    })

    await waitFor(() => {
      expect(mockSubmit).toBeCalledWith({
        select: { value: '1', label: 'One' },
      })
    })
  })

  it('should not call submit if there is an validation error', async () => {
    const mockSubmit = jest.fn()

    render(<CheckboxWithForm submit={mockSubmit} />)

    act(() => {
      userEvent.click(screen.getByTestId('submit'))
    })

    await waitFor(() => {
      expect(mockSubmit).toBeCalledTimes(0)
    })
  })

  it('should have focus if there is an validation error', async () => {
    const mockSubmit = jest.fn()

    render(<CheckboxWithForm submit={mockSubmit} />)

    act(() => {
      userEvent.click(screen.getByTestId('submit'))
    })

    await waitFor(() => {
      expect(mockSubmit).toBeCalledTimes(0)
    })

    expect(screen.getByTestId('checkbox')).toHaveFocus()

    // await waitFor(() => {})
  })
})
