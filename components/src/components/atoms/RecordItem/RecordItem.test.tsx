import * as React from 'react'

import { cleanup, mockFunction, render, screen } from '@/test'

import { useCopied } from '@/src/hooks/useCopied'

import { RecordItem } from './RecordItem'
import { FlameSVG } from '@/src/icons'

vi.mock('@/src/hooks/useCopied')

const mockCopied = vi.fn()
const mockUseCopied = mockFunction(useCopied)
mockUseCopied.mockReturnValue({ copy: mockCopied, copied: false })

describe('<RecordItem />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <RecordItem
        icon={<FlameSVG />}
        keyLabel="Title"
        keySublabel="Subtitle"
        value="Real value"
      >
        Display value
      </RecordItem>,
    )
    expect(screen.getByText('Display value')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
    expect(screen.queryByText('Real value')).toBeNull()
  })

  it('should copy value to clipboard if clicked', () => {
    render(
      <RecordItem
        icon={<FlameSVG />}
        keyLabel="Title"
        keySublabel="Subtitle"
        value="Real value"
      >
        Display value
      </RecordItem>,
    )

    screen.getByText('Display value').click()
    expect(mockCopied).toHaveBeenCalledWith('Real value')
  })

  it('should render anchor if as is a', () => {
    render(
      <RecordItem
        as="a"
        data-testid="record-item"
        icon={<FlameSVG />}
        keyLabel="Title"
        keySublabel="Subtitle"
        value="Real value"
      >
        Display value
      </RecordItem>,
    )
    expect(screen.getByTestId('record-item').nodeName).toBe('A')
  })

  it('should have link as href if as is a', () => {
    render(
      <RecordItem
        as="a"
        data-testid="record-item"
        icon={<FlameSVG />}
        keyLabel="Title"
        keySublabel="Subtitle"
        link="https://ens.domains"
        value="Real value"
      >
        Display value
      </RecordItem>,
    )
    expect(screen.getByTestId('record-item')).toHaveAttribute(
      'href',
      'https://ens.domains',
    )
  })

  it('should passthrough custom target prop if as is a', () => {
    render(
      <RecordItem
        as="a"
        data-testid="record-item"
        icon={<FlameSVG />}
        keyLabel="Title"
        keySublabel="Subtitle"
        target="_parent"
        value="Real value"
      >
        Display value
      </RecordItem>,
    )
    expect(screen.getByTestId('record-item')).toHaveAttribute(
      'target',
      '_parent',
    )
  })

  it('should render button if as is button', () => {
    render(
      <RecordItem
        as="button"
        data-testid="record-item"
        icon={<FlameSVG />}
        keyLabel="Title"
        keySublabel="Subtitle"
        value="Real value"
      >
        Display value
      </RecordItem>,
    )
    expect(screen.getByTestId('record-item').nodeName).toBe('BUTTON')
  })
})
