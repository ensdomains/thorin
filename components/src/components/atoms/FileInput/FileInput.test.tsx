import * as React from 'react'

import { cleanup, render, screen, waitFor } from '@/test'

import { FileInput } from './FileInput'

describe('<FileInput />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <FileInput>
        {(context) =>
          context.name ? <div>{context.name}</div> : <div>Upload file</div>
        }
      </FileInput>,
    )
    expect(screen.getByText(/upload/i)).toBeInTheDocument()
  })

  it('should pass a ref down', async () => {
    const ref = { current: null } as React.RefObject<any>
    render(
      <FileInput ref={ref}>
        {(context) =>
          context.name ? <div>{context.name}</div> : <div>Upload file</div>
        }
      </FileInput>,
    )
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })
})
