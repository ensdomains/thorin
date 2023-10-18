import * as React from 'react'

import { cleanup, fireEvent, render, screen, userEvent, waitFor } from '@/test'

import { Input } from './Input'

describe('<Input />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Input label="Funding Goal" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('receives user input', async () => {
    render(<Input label="Display Name" />)

    await userEvent.type(screen.getByRole('textbox'), 'Satoshi Nakamoto')
    expect(screen.getByRole('textbox')).toHaveValue('Satoshi Nakamoto')
  })

  describe('[type=text]', () => {
    it('maxLength', async () => {
      render(<Input label="Short Name" maxLength={7} />)

      const element = screen.getByLabelText(/short/i)
      await userEvent.type(element, 'Satoshi Nakamoto')
      expect(element).toHaveValue('Satoshi')
    })
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(
      <Input label="Funding Goal" placeholder="10" ref={ref} units="ETH" />,
    )
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  it('should fire onChange if clear button is pressed', async () => {
    const ref = { current: null } as React.RefObject<any>
    const handleOnChange = jest.fn()
    render(
      <Input
        clearable
        label="Funding Goal"
        name="testing"
        placeholder="10"
        ref={ref}
        units="ETH"
        onChange={handleOnChange}
      />,
    )
    await userEvent.type(screen.getByRole('textbox'), 'Satoshi Nakamoto')
    fireEvent.click(screen.getByTestId('input-action-button'))
    expect(handleOnChange).toHaveBeenCalled()
  })
})
