import * as React from 'react'

import { cleanup, fireEvent, render, screen, waitFor } from '@/test'

import { FileInput } from './FileInput'

describe('<FileInput />', () => {
  // jsdom does not implement these, and selecting a file triggers a preview URL.
  beforeAll(() => {
    URL.createObjectURL = vi.fn(() => 'blob:mock') as typeof URL.createObjectURL
    URL.revokeObjectURL = vi.fn() as typeof URL.revokeObjectURL
  })

  afterEach(cleanup)

  it('renders', () => {
    render(
      <FileInput>
        {context =>
          context.name ? <div>{context.name}</div> : <div>Upload file</div>}
      </FileInput>,
    )
    expect(screen.getByText(/upload/i)).toBeInTheDocument()
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>
    render(
      <FileInput ref={ref}>
        {context =>
          context.name ? <div>{context.name}</div> : <div>Upload file</div>}
      </FileInput>,
    )
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  const dropFile = (label: HTMLElement, file: File) =>
    fireEvent.drop(label, {
      dataTransfer: {
        files: [file],
        items: [{ kind: 'file', getAsFile: () => file }],
      },
    })

  it('accepts a dropped file', async () => {
    const onChange = vi.fn()
    render(
      <FileInput onChange={onChange}>
        {context => (context.name ? <div>{context.name}</div> : <div>Upload file</div>)}
      </FileInput>,
    )
    const label = screen.getByText(/upload/i).closest('label') as HTMLElement
    dropFile(label, new File(['a'], 'photo.png', { type: 'image/png' }))
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(screen.getByText('photo.png')).toBeInTheDocument()
    })
  })

  it('ignores a dropped file when disabled', async () => {
    const onChange = vi.fn()
    render(
      <FileInput disabled onChange={onChange}>
        {context => (context.name ? <div>{context.name}</div> : <div>Upload file</div>)}
      </FileInput>,
    )
    const label = screen.getByText(/upload/i).closest('label') as HTMLElement
    dropFile(label, new File(['a'], 'photo.png', { type: 'image/png' }))
    // handleFile (and its onChange) fire synchronously during the drop dispatch,
    // so a rejected drop leaves onChange uncalled and no filename rendered.
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.queryByText('photo.png')).not.toBeInTheDocument()
  })
})
