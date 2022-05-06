import * as React from 'react'

import { ThemeProvider } from 'styled-components'
import { act } from 'react-dom/test-utils'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Select } from './Select'

describe('<Select />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
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
      <ThemeProvider theme={{ mode: 'light' }}>
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

  it('should update value correctly', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
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
    expect(mockCallback).toBeCalledWith(null)
    act(() => {
      userEvent.click(screen.getByText('One'))
    })
    await waitFor(() => {
      expect(mockCallback).toBeCalledWith({ value: '1', label: 'One' })
    })
  })

  it('should not allow disabled option to be selected', () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
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
      <ThemeProvider theme={{ mode: 'light' }}>
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
})
