import * as React from 'react'

import {
  cleanup,
  getPropertyValue,
  render,
  screen,
  userEvent,
  waitFor,
} from '@/test'

import { Select } from './Select'

describe('<Select />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <Select
        label="select"
        options={[
          { value: '0', label: 'Zero' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
        placeholder="Select an option"
      />,
    )
    expect(screen.getByLabelText('select')).toBeInTheDocument()
  })

  it('should update selection correctly', async () => {
    render(
      <Select
        label="select"
        options={[
          { value: '0', label: 'Zero' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
      />,
    )
    await userEvent.click(screen.getByTestId('select-container'))
    await userEvent.click(screen.getByTestId('select-option-1'))
    expect(screen.getByTestId('selected').innerHTML).toContain('One')
  })

  it('should call onChange when selection made', async () => {
    const mockCallback = jest.fn((e: any) => [
      e.target.value,
      e.currentTarget.value,
    ])
    render(
      <Select
        label="select"
        options={[
          { value: '0', label: 'Zero' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
        onChange={mockCallback}
      />,
    )
    await userEvent.click(screen.getByTestId('select-container'))
    await userEvent.click(screen.getByTestId('select-option-1'))
    await waitFor(() => {
      expect(mockCallback).toHaveReturnedWith(['1', '1'])
    })
  })

  it('should update value when value changes', async () => {
    const { rerender } = render(
      <Select
        label="select"
        options={[
          { value: '0', label: 'Zero' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
        value="0"
      />,
    )

    rerender(
      <Select
        label="select"
        options={[
          { value: '0', label: 'Zero' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
        value="1"
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('selected').innerHTML).toContain('One')
    })
  })

  it('should not allow disabled option to be selected', async () => {
    const mockCallback = jest.fn()
    render(
      <Select
        label="select"
        options={[
          { value: '0', label: 'Zero' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two', disabled: true },
        ]}
        onChange={mockCallback}
      />,
    )
    await userEvent.click(screen.getByTestId('select-container'))
    await userEvent.click(screen.getByText('Two'))
    expect(screen.getAllByText('Two').length).toEqual(1)
  })

  // JS DOM doesn't support css variables
  it('should close dropdown when clicking outside of element', async () => {
    const mockCallback = jest.fn()
    render(
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
      </div>,
    )

    const getDisplayValue = () =>
      getPropertyValue(screen.getByRole('listbox'), 'display')
    expect(getDisplayValue()).toEqual('none')

    await userEvent.click(screen.getByTestId('select-container'))

    await waitFor(() => {
      expect(getDisplayValue()).toEqual('block')
    })
    await userEvent.click(screen.getByText('outside'))

    await waitFor(() => {
      expect(getDisplayValue()).toEqual('none')
    })
  })

  /** Autocomplete */

  it('should filter options if autocomplete is true ', async () => {
    const mockCallback = jest.fn()
    render(
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
      </div>,
    )

    await userEvent.click(screen.getByTestId('select-container'))

    await userEvent.type(screen.getByTestId('select-input'), 'o')

    await waitFor(() => {
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    await userEvent.type(screen.getByTestId('select-input'), 'n')

    await waitFor(() => {
      expect(screen.queryByText('Zero')).toBeNull()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.queryByText('Two')).toBeNull()
    })
  })

  it('should update selection using arrows', async () => {
    render(
      <Select
        autocomplete
        label="select"
        options={[
          { value: '0', label: 'Zero' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
      />,
    )

    await userEvent.click(screen.getByTestId('select-container'))
    const input = await screen.findByTestId('select-input')

    await userEvent.type(input, '{arrowdown}')
    await userEvent.type(input, '{arrowdown}')
    await userEvent.type(input, '{enter}')
    expect(screen.getByTestId('selected').innerHTML).toContain('One')
  })

  /** Createable */

  it('should filter options if createable is true ', async () => {
    const mockCallback = jest.fn()
    render(
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
      </div>,
    )

    await userEvent.click(screen.getByTestId('select-container'))

    await userEvent.type(screen.getByTestId('select-input'), 'o')

    await waitFor(() => {
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    await userEvent.type(screen.getByTestId('select-input'), 'n')

    await waitFor(() => {
      expect(screen.queryByText('Zero')).toBeNull()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.queryByText('Two')).toBeNull()
    })
  })

  it('should show create options only if it is unique ', async () => {
    const mockCallback = jest.fn()
    render(
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
      </div>,
    )

    await userEvent.click(screen.getByTestId('select-container'))

    await userEvent.type(screen.getByTestId('select-input'), 'o')

    await waitFor(() => {
      expect(screen.queryAllByRole('option').length).toEqual(4)
      expect(screen.getByText('Zero')).toBeVisible()
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.getByText('Two')).toBeVisible()
    })

    await userEvent.type(screen.getByTestId('select-input'), 'ne')

    await waitFor(() => {
      expect(screen.getByTestId('select-input')).toHaveValue('one')
      expect(screen.getByText('One')).toBeVisible()
      expect(screen.queryAllByRole('option').length).toEqual(1)
    })
  })

  it('should call on create if create option is clicked', async () => {
    const mockCallback = jest.fn()
    render(
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
      </div>,
    )

    await userEvent.click(screen.getByTestId('select-container'))

    await userEvent.type(screen.getByTestId('select-input'), 'onsies')
    expect(screen.getByTestId('select-input')).toHaveValue('onsies')

    const create = await screen.findByTestId(
      'select-option-CREATE_OPTION_VALUE',
    )
    await userEvent.click(create)

    await waitFor(() => {
      expect(mockCallback).toBeCalledWith('onsies')
    })
  })

  it('should call on create if create option is selected with arrows and enter is pressed', async () => {
    const mockCallback = jest.fn()
    render(
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
      </div>,
    )
    await waitFor(() => {
      expect(screen.getByText('select')).toBeVisible()
    })
    await userEvent.click(screen.getByTestId('select-container'))
    await userEvent.type(screen.getByTestId('select-input'), 'onsies')
    await userEvent.type(screen.getByTestId('select-input'), '{arrowdown}')
    await userEvent.type(screen.getByTestId('select-input'), '{enter}')

    await waitFor(() => {
      expect(mockCallback).toBeCalledWith('onsies')
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(
      <Select
        label="select"
        options={[
          { value: '0', label: 'Zero' },
          { value: '1', label: 'One' },
          { value: '2', label: 'Two' },
        ]}
        ref={ref}
      />,
    )
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })
})
