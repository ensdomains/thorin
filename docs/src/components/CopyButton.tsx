import * as React from 'react'
import { default as copy } from 'copy-to-clipboard'

import { Button, CheckSVG, CopySVG } from '@ensdomains/thorin'

type Props = {
  content: string
}

type State = {
  copied: boolean
}

const initialState = {
  copied: false,
}

export const CopyButton = ({ content }: Props) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>()
  const [state, setState] = React.useState<State>(initialState)

  const onClick = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      setState((x) => ({ ...x, copied: false }))
    }

    copy(content, {
      format: 'text/plain',
    })

    setState((x) => ({ ...x, copied: true }))
    timeoutRef.current = setTimeout(
      () => setState((x) => ({ ...x, copied: false })),
      500,
    )
  }, [content])

  return (
    <Button colorStyle="transparent" size="small" onClick={onClick}>
      {state.copied ? <CheckSVG /> : <CopySVG />}
    </Button>
  )
}
