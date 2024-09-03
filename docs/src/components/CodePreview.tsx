import * as React from 'react'
import { default as NextImage } from 'next/image'
import { default as NextLink } from 'next/link'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'
import type { PrismTheme } from 'prism-react-renderer'

import type { Colors } from '@ensdomains/thorin'
import { Button, UpChevronSVG } from '@ensdomains/thorin'
import * as Components from '@ensdomains/thorin'

import { createPlayroomLink } from '~/utils/playroom'
import { usePlayroomStore } from '~/playroom/PlayroomState'
import { avatars } from '~/playroom/useScope'

import { Prism } from './Prism'
import ComponentWrapper from '../playroom/ComponentWrapper'
import { CopyButton } from './CopyButton'
import type { BoxProps } from '@ensdomains/thorin'
import { Box } from '@ensdomains/thorin'
import { DownChevronSVG } from '@ensdomains/thorin'
import { OutlinkSVG } from '@ensdomains/thorin'

export type Props = {
  backgroundColor?: Colors
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

const Container = (props: BoxProps) => (
  <Box
    {...props}
    backgroundColor="background"
    borderColor="border"
    borderRadius="2xLarge"
    borderWidth="1x"
    borderStyle="solid"
    overflow="hidden"
  />
)

const ContainerInner = React.forwardRef<
  HTMLElement,
  BoxProps & { $expand: boolean }
>(({ $expand, ...props }, ref) => (
  <Box
    {...props}
    ref={ref}
    backgroundColor="background"
    borderTopLeftRadius="2xLarge"
    borderTopRightRadius="2xLarge"
    borderBottomLeftRadius={$expand ? '2xLarge' : 'unset'}
    borderBottomRightRadius={$expand ? '2xLarge' : 'unset'}
    overflow="auto"
    padding="4"
  />
))
ContainerInner.displayName = 'ComponentInner'

const LiveEditorContainer = (props: BoxProps) => (
  <Box
    {...props}
    backgroundColor="greySurface"
    position="relative"
    padding="1.5"
    borderColor="transparent"
    borderTopColor="border"
    borderStyle="solid"
    fontFamily="mono"
    borderWidth="1x"
  />
)

export const CodePreview = ({
  code: _code,
  expand = false,
  theme,
  minHeight,
}: Props) => {
  const previewRef = React.useRef<HTMLElement>(null)
  const [state, setState] = React.useState<State>({
    ...initialState,
    expand,
  })
  const [code, setCode] = React.useState(_code)
  React.useEffect(() => {
    if (_code && _code !== code) setCode(_code)
  }, [_code])
  const store = usePlayroomStore()

  return (
    <LiveProvider
      as="div"
      code={code}
      scope={{
        mdx,
        ...Components,
        ComponentWrapper,
        ...store,
        previewRef,
        NextImage,
        NextLink,
        avatars,
      }}
      theme={theme}
      transformCode={code => '/** @jsx mdx */' + code}
    >
      <Container>
        <ContainerInner
          $expand={state.expand}
          ref={previewRef}
          style={{
            minHeight: minHeight || 'none',
          }}
        >
          <LivePreview />

          <LiveError
            style={{
              fontFamily: 'inherit',
              margin: 0,
            }}
          />
        </ContainerInner>

        {state.expand && (
          <LiveEditorContainer>
            <LiveEditor
              prism={Prism}
              onChange={newCode => setCode(newCode)}
            />
            <Box position="absolute" top="2" right="2">
              <CopyButton content={code} />
            </Box>
          </LiveEditorContainer>
        )}
      </Container>

      <Box display="flex" justifyContent="flex-end" marginTop="2">
        <div>
          <Button
            colorStyle="transparent"
            color="blue"
            prefix={state.expand ? <UpChevronSVG /> : <DownChevronSVG />}
            size="small"
            onClick={() => setState(x => ({ ...x, expand: !x.expand }))}
          >
            {state.expand ? 'Collapse Code' : 'Expand Code'}
          </Button>
        </div>

        <div>
          <Button
            as="a"
            colorStyle="transparent"
            color="blue"
            prefix={<OutlinkSVG />}
            href={createPlayroomLink({ code })}
            size="small"
            target="_blank"
          >
            Playroom
          </Button>
        </div>
      </Box>
    </LiveProvider>
  )
}
