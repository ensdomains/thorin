import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { act, cleanup, render, screen, userEvent, waitFor } from '@/test'

import { lightTheme } from '@/src/tokens'

import { Select } from './Select'
import { Input } from '../Input'

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
          placeholder="Select an option"
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
    userEvent.click(screen.getByTestId('select-container'))
    userEvent.click(screen.getByTestId('select-option-1'))
    expect(screen.getByTestId('selected').innerHTML).toContain('One')
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
    userEvent.click(screen.getByTestId('select-container'))
    userEvent.click(screen.getByTestId('select-option-1'))
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
      expect(screen.getByTestId('selected').innerHTML).toContain('One')
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
    userEvent.click(screen.getByTestId('select-container'))
    userEvent.click(screen.getByText('Two'))
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

    userEvent.click(screen.getByTestId('select-container'))

    act(() => userEvent.click(screen.getByText('outside')))

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

    userEvent.click(screen.getByTestId('select-container'))

    userEvent.type(screen.getByTestId('select-input'), 'o')

    await waitFor(() => {
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    userEvent.type(screen.getByTestId('select-input'), 'n')

    await waitFor(() => {
      expect(screen.queryByText('Zero')).toBeNull()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.queryByText('Two')).toBeNull()
    })
  })

  it('should update selection using arrows', async () => {
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

    userEvent.click(screen.getByTestId('select-container'))
    const input = await screen.findByTestId('select-input')

    userEvent.type(input, '{arrowdown}')
    userEvent.type(input, '{arrowdown}')
    userEvent.type(input, '{enter}')
    expect(screen.getByTestId('selected').innerHTML).toContain('One')
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

    userEvent.click(screen.getByTestId('select-container'))

    userEvent.type(screen.getByTestId('select-input'), 'o')

    await waitFor(() => {
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    userEvent.type(screen.getByTestId('select-input'), 'n')

    await waitFor(() => {
      expect(screen.queryByText('Zero')).toBeNull()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.queryByText('Two')).toBeNull()
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

    userEvent.click(screen.getByTestId('select-container'))

    userEvent.type(screen.getByTestId('select-input'), 'o')

    await waitFor(() => {
      expect(screen.queryAllByRole('option').length).toEqual(4)
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    userEvent.type(screen.getByTestId('select-input'), 'ne')

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

    userEvent.click(screen.getByTestId('select-container'))

    userEvent.type(screen.getByTestId('select-input'), 'onsies')
    expect(screen.getByTestId('select-input')).toHaveValue('onsies')

    const create = await screen.findByTestId(
      'select-option-CREATE_OPTION_VALUE',
    )
    userEvent.click(create)

    await waitFor(() => {
      expect(mockCallback).toBeCalledWith('onsies')
    })
  })

  it('should call on create if create option is selected with arrows and enter is pressed', async () => {
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

    userEvent.click(screen.getByTestId('select-container'))
    userEvent.type(screen.getByTestId('select-input'), 'onsies')
    userEvent.type(screen.getByTestId('select-input'), '{arrowdown}')
    userEvent.type(screen.getByTestId('select-input'), '{enter}')

    await waitFor(() => {
      expect(mockCallback).toBeCalledWith('onsies')
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(
      <ThemeProvider theme={lightTheme}>
        <Select
          label="select"
          options={[
            { value: '0', label: 'Zero' },
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
          ]}
          ref={ref}
        />
      </ThemeProvider>,
    )
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  it('should show dropdown menu when clicked and embeded in Input', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Input
          label="parent component"
          placeholder="parent component"
          prefix={
            <Select
              label="select"
              options={[
                { value: '0', label: 'Zero' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ]}
              value="0"
            />
          }
          prefixAs="div"
        />
      </ThemeProvider>,
    )

    userEvent.click(screen.getByTestId('select-container'))
    await waitFor(() => {
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })
  })

  it('should have focus on input when clicked and embeded in Input as autocomplete Select', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Input
          label="parent component"
          placeholder="parent component"
          prefix={
            <Select
              autocomplete
              label="select"
              options={[
                { value: '0', label: 'Zero' },
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
              ]}
            />
          }
          prefixAs="div"
        />
      </ThemeProvider>,
    )

    userEvent.click(screen.getByTestId('select-container'))

    await waitFor(() => {
      expect(document.activeElement).toEqual(screen.getByTestId('select-input'))
    })
  })
})
