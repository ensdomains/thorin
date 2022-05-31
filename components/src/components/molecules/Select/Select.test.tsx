import * as React from 'react'

import { ThemeProvider } from 'styled-components'
import { act } from 'react-dom/test-utils'

import { useForm } from 'react-hook-form'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Select } from './Select'
import { lightTheme } from '@/src/tokens'

const SelectWithForm = ({ submit }: { submit: (data: unknown) => void }) => {
  const { register, handleSubmit } = useForm<{
    select?: string
  }>({
    defaultValues: {
      select: '',
    },
  })
  return (
    <ThemeProvider theme={lightTheme}>
      <form
        onSubmit={handleSubmit((data: any) => {
          submit(data)
        })}
      >
        <div>outside</div>
        <Select
          label="select"
          {...register('select', {
            required: true,
          })}
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two', disabled: true },
          ]}
          tabIndex={2}
        />
        <input data-testid="submit" type="submit" />
      </form>
    </ThemeProvider>
  )
}

describe('<Select />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="select"
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
        />
      </ThemeProvider>,
    )
    expect(screen.getByLabelText('select')).toBeInTheDocument()
  })

  it('should update selection correctly', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="select"
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
        />
      </ThemeProvider>,
    )
    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })
    act(() => {
      userEvent.click(screen.getByText('One'))
    })
    expect(screen.getByTestId('selected').innerHTML).toEqual('One')
  })

  it('should call onChange when selection made', async () => {
    const mockCallback = jest.fn((e: any) => [
      e.target.value,
      e.currentTarget.value,
    ])
    render(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="select"
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
          onChange={mockCallback}
        />
      </ThemeProvider>,
    )
    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })
    act(() => {
      userEvent.click(screen.getByText('One'))
    })
    await waitFor(() => {
      expect(mockCallback).toHaveReturnedWith(['1', '1'])
    })
  })

  it('should update value when value changes', async () => {
    const { rerender } = render(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="select"
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
          value="0"
        />
      </ThemeProvider>,
    )

    rerender(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="select"
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
          value="1"
        />
      </ThemeProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('selected').innerHTML).toEqual('One')
    })
  })

  it('should not allow disabled option to be selected', () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="select"
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two', disabled: true },
          ]}
          onChange={mockCallback}
        />
      </ThemeProvider>,
    )
    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })
    act(() => {
      userEvent.click(screen.getByText('Two'))
    })
    expect(screen.getAllByText('Two').length).toEqual(1)
  })

  it('should close dropdown when clicking outside of element', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <div>outside</div>
          <Select
            label="select"
            options={[
              { value: '0', label: 'Zero' },
              { value: '1', label: 'One' },
              { value: '2', label: 'Two', disabled: true },
            ]}
            onChange={mockCallback}
          />
        </div>
      </ThemeProvider>,
    )
    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })
    act(() => {
      userEvent.click(screen.getByText('outside'))
    })
    await waitFor(() => {
      expect(screen.getByText('Two')).not.toBeVisible()
    })
  })

  /** Autocomplete */

  it('should filter options if autocomplete is true ', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <div>outside</div>
          <Select
            autocomplete
            label="select"
            options={[
              { value: '0', label: 'Zero' },
              { value: '1', label: 'One' },
              { value: '2', label: 'Two', disabled: true },
            ]}
            onChange={mockCallback}
          />
        </div>
      </ThemeProvider>,
    )

    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })

    act(() => {
      userEvent.type(screen.getByTestId('select-input'), 'o')
    })

    await waitFor(() => {
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    act(() => {
      userEvent.type(screen.getByTestId('select-input'), 'n')
    })

    await waitFor(() => {
      expect(screen.queryByText('Zero')).not.toBeInTheDocument()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.queryByText('Two')).not.toBeInTheDocument()
    })
  })

  it('should update selection using arrows', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Select
          autocomplete
          label="select"
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
        />
      </ThemeProvider>,
    )
    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })

    act(() => {
      userEvent.type(screen.getByTestId('select-input'), '{arrowdown}')
    })

    act(() => {
      userEvent.type(screen.getByTestId('select-input'), '{enter}')
    })
    expect(screen.getByTestId('selected').innerHTML).toEqual('Zero')
  })

  /** Createable */

  it('should filter options if createable is true ', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <div>outside</div>
          <Select
            createable
            label="select"
            options={[
              { value: '0', label: 'Zero' },
              { value: '1', label: 'One' },
              { value: '2', label: 'Two', disabled: true },
            ]}
            onChange={mockCallback}
          />
        </div>
      </ThemeProvider>,
    )

    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })

    act(() => {
      userEvent.type(screen.getByTestId('select-input'), 'o')
    })

    await waitFor(() => {
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    act(() => {
      userEvent.type(screen.getByTestId('select-input'), 'n')
    })

    await waitFor(() => {
      expect(screen.queryByText('Zero')).not.toBeInTheDocument()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.queryByText('Two')).not.toBeInTheDocument()
    })
  })

  it('should show create options only if it is unique ', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <div>outside</div>
          <Select
            createable
            label="select"
            options={[
              { value: '0', label: 'Zero' },
              { value: '1', label: 'One' },
              { value: '2', label: 'Two', disabled: true },
            ]}
            onChange={mockCallback}
          />
        </div>
      </ThemeProvider>,
    )

    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })

    act(() => {
      userEvent.type(screen.getByTestId('select-input'), 'o')
    })

    await waitFor(() => {
      expect(screen.queryAllByRole('option').length).toEqual(4)
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    await act(async () => {
      await userEvent.type(screen.getByTestId('select-input'), 'ne', {
        delay: 100,
      })
    })

    await waitFor(() => {
      expect(screen.getByTestId('select-input')).toHaveValue('one')
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.queryAllByRole('option').length).toEqual(1)
    })
  })

  it('should call on create if create option is clicked', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <div>outside</div>
          <Select
            createable
            label="select"
            options={[
              { value: '0', label: 'Zero' },
              { value: '1', label: 'One' },
              { value: '2', label: 'Two', disabled: true },
            ]}
            onCreate={mockCallback}
          />
        </div>
      </ThemeProvider>,
    )

    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })

    await act(async () => {
      await userEvent.type(screen.getByTestId('select-input'), 'onsies', {
        delay: 100,
      })
    })

    act(() => {
      expect(screen.getByTestId('select-input')).toHaveValue('onsies')
      const create = screen.queryByRole('option')
      expect(create).toBeVisible()
      create && userEvent.click(create)
    })

    await waitFor(() => {
      expect(mockCallback).toBeCalledWith('onsies')
    })
  })

  // /** React Form Hook Integration Tests */

  it('should call on blur when clicking outside of element', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <div>outside</div>
          <Select
            label="select"
            options={[
              { value: '0', label: 'Zero' },
              { value: '1', label: 'One' },
              { value: '2', label: 'Two', disabled: true },
            ]}
            onBlur={mockCallback}
          />
        </div>
      </ThemeProvider>,
    )
    act(() => {
      userEvent.click(screen.getByTestId('selected'))
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

    render(<SelectWithForm submit={mockSubmit} />)
    act(() => {
      userEvent.click(screen.getByTestId('selected'))
    })
    act(() => {
      userEvent.click(screen.getByText('One'))
    })
    expect(screen.getByTestId('selected').innerHTML).toEqual('One')

    act(() => {
      userEvent.click(screen.getByTestId('submit'))
    })

    await waitFor(() => {
      expect(mockSubmit).toBeCalledWith({
        select: '1',
      })
    })
  })

  it('should not call submit if there is an validation error', async () => {
    const mockSubmit = jest.fn()

    render(<SelectWithForm submit={mockSubmit} />)

    act(() => {
      userEvent.click(screen.getByTestId('submit'))
    })

    await waitFor(() => {
      expect(mockSubmit).toBeCalledTimes(0)
    })
  })

  it('should have focus if there is an validation error', async () => {
    const mockSubmit = jest.fn()

    render(<SelectWithForm submit={mockSubmit} />)

    act(() => {
      userEvent.click(screen.getByTestId('submit'))
    })

    await waitFor(() => {
      expect(mockSubmit).toBeCalledTimes(0)
    })

    await waitFor(() => {
      expect(screen.getByTestId('select-container')).toHaveFocus()
    })

    // await waitFor(() => {})
  })
})
