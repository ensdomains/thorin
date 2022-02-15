import * as React from 'react'
import { default as NextImage } from 'next/image'
import { default as NextLink } from 'next/link'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'
import { PrismTheme } from 'prism-react-renderer'

import * as Components from '@ensdomains/thorin/components'
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@ensdomains/thorin/components'
import { vars } from '@ensdomains/thorin/css'

import { createPlayroomLink } from '~/utils/playroom'
import { usePlayroomStore } from '../../../../playroom/src/PlayroomState'
import { avatars } from '../../../../playroom/src/useScope'
import { CopyButton } from '../CopyButton'
import './styles.css'

export type Props = {
  backgroundColor?: Components.BoxProps['backgroundColor']
  code: string
  expand?: boolean
  theme?: PrismTheme
  minHeight?: string
}

type State = {
  expand: boolean
}

const initialState = {
  expand: false,
}

export const CodePreview = ({
  backgroundColor = 'background',
  code,
  expand = false,
  theme,
  minHeight,
}: Props) => {
  const previewRef = React.useRef<HTMLElement>(null)
  const [state, setState] = React.useState<State>({
    ...initialState,
    expand,
  })
  const store = usePlayroomStore()
  const themeValue = useTheme()

  return (
    <LiveProvider
      as="div"
      code={code}
      scope={{
        mdx,
        ...Components,
        ...store,
        ...themeValue,
        previewRef,
        vars,
        NextImage,
        NextLink,
        avatars,
      }}
      theme={theme}
      transformCode={(code) => '/** @jsx mdx */' + code}
    >
      <Box
        backgroundColor="background"
        borderColor="foregroundSecondary"
        borderRadius="2xLarge"
        borderWidth="0.5"
        overflow="hidden"
      >
        <Box
          backgroundColor={backgroundColor}
          borderBottomRadius={state.expand ? undefined : '2xLarge'}
          borderTopRadius="2xLarge"
          overflow="scroll"
          padding="6"
          ref={previewRef}
          style={{
            minHeight: minHeight || 'none',
          }}
        >
          <LivePreview />

          <Typography color="red" font="mono">
            <LiveError
              style={{
                fontFamily: 'inherit',
                margin: 0,
              }}
            />
          </Typography>
        </Box>

        {state.expand && (
          <Box position="relative">
            <LiveEditor />

            <Box position="absolute" right="3.5" top="3.5">
              <CopyButton content={code} />
            </Box>
          </Box>
        )}
      </Box>

      <Box marginY="2">
        <Stack direction="horizontal" justify="flex-end" space="2">
          <Button
            size="small"
            variant="secondary"
            onClick={() => setState((x) => ({ ...x, expand: !x.expand }))}
          >
            {state.expand ? 'Hide Code' : 'View Code'}
          </Button>

          <Button
            as="a"
            href={createPlayroomLink({ code })}
            size="small"
            target="_blank"
            variant="secondary"
          >
            Open in Playroom
          </Button>
        </Stack>
      </Box>
    </LiveProvider>
  )
}
