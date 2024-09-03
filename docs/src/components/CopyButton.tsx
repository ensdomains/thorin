import * as React from 'react'
import { default as copy } from 'copy-to-clipboard'

import { CheckSVG, CopySVG, Box } from '@ensdomains/thorin'

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
      setState(x => ({ ...x, copied: false }))
    }

    copy(content, {
      format: 'text/plain',
    })

    setState(x => ({ ...x, copied: true }))
    timeoutRef.current = setTimeout(
      () => setState(x => ({ ...x, copied: false })),
      500,
    )
  }, [content])

  return (
    <Box as="button" wh="10" shape="square" cursor="pointer" onClick={onClick}>
      <Box
        wh="6"
        backgroundColor={{
          base: '$background',
          hover: 'greyLight',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="medium"
        transform={{ base: 'translateY(0)', hover: 'translateY(-1px)' }}
        transition="all 0.3s ease-in-out"
      >
        <Box
          as={state.copied ? <CheckSVG /> : <CopySVG />}
          wh="3"
          color="textPrimary"
        />
      </Box>
    </Box>
  )
}
