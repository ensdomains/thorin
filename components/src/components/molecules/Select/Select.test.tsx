import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Select } from './Select'
import { lightTheme } from '@/src/tokens'

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
    userEvent.click(screen.getByTestId('selected'))
    userEvent.click(screen.getByText('One'))
    expect(screen.getByTestId('selected').innerHTML).toEqual('One')
  })

  it('should update value correctly', async () => {
    const mockCallback = jest.fn()
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
    userEvent.click(screen.getByTestId('selected'))
    expect(mockCallback).toBeCalledWith(null)
    userEvent.click(screen.getByText('One'))
    await waitFor(() => {
      expect(mockCallback).toBeCalledWith({ value: '1', label: 'One' })
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
    userEvent.click(screen.getByTestId('selected'))
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
    userEvent.click(screen.getByTestId('selected'))
    userEvent.click(screen.getByText('outside'))
    await waitFor(() => {
      expect(screen.getByText('Two')).not.toBeVisible()
    })
  })
})
