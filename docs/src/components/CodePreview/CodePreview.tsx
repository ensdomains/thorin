import * as React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { default as NextImage } from 'next/image'
import { default as NextLink } from 'next/link'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'
import { PrismTheme } from 'prism-react-renderer'

import { Button, Colors, Components } from '@ensdomains/thorin'

import { createPlayroomLink } from '~/utils/playroom'
import { usePlayroomStore } from '~/playroom/PlayroomState'
import { avatars } from '~/playroom/useScope'

import { Prism } from '../Prism'
import ComponentWrapper from '../../playroom/ComponentWrapper'
import { CopyButton } from '../CopyButton'
import { DeleteMe } from '../DeleteMe'
import { Box, BoxProps } from '@ensdomains/thorin'
import { liveEditor } from './styles.css'

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
    backgroundColor="$background"
    borderColor="$greySurface"
    borderRadius="$2xLarge"
    borderWidth="$2x"
    overflow="hidden"
    fontFamily="$mono"
  />
)

const ContainerInner = React.forwardRef<
  HTMLElement,
  BoxProps & { $expand: boolean }
>(({ $expand, ...props }, ref) => (
  <Box
    {...props}
    ref={ref}
    backgroundColor="$background"
    borderTopLeftRadius="$2xLarge"
    borderTopRightRadius="$2xLarge"
    borderBottomLeftRadius={$expand ? '2xLarge' : 'unset'}
    borderBottomRightRadius={$expand ? '2xLarge' : 'unset'}
    overflow="auto"
    padding="$6"
  />
))
ContainerInner.displayName = 'ComponentInner'

const LiveEditorContainer = (props: BoxProps) => (
  <Box
    {...props}
    className={liveEditor}
    backgroundColor="$background"
    position="relative"
    padding="0.875rem 2.75rem 0.875rem 0.875rem"
  />
)
// const LiveEditorContainer2 = styled.div(
//   ({ theme }) => css`
//     background-color: ${theme.colors.backgroundSecondary};
//     position: relative;
//     padding: 0.875rem 2.75rem 0.875rem 0.875rem;

//     .token {
//       font-family: 'iAWriter Mono', Menlo, Monaco, Consolas, 'Liberation Mono',
//         'Courier New', monospace, sans-serif !important;
//       font-size: 1.0625rem;
//       font-feature-settings: 'ss01', 'ss03';
//     }
//   `,
// )

const ButtonContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: ${theme.space['2']};
  `,
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
    _code && _code !== code && setCode(_code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_code])
  const store = usePlayroomStore()
  const themeValue = useTheme()

  return (
    <LiveProvider
      as="div"
      code={code}
      scope={{
        mdx,
        ...Components,
        ComponentWrapper,
        ...store,
        ...themeValue,
        previewRef,
        NextImage,
        NextLink,
        avatars,
        DeleteMe,
      }}
      theme={theme}
      transformCode={(code) => '/** @jsx mdx */' + code}
    >
      <Container style={{ background: 'orange' }}>
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
              style={{
                fontFamily: 'Arial, sans-serif',
              }}
              onChange={(newCode) => setCode(newCode)}
            />
            <div
              style={{
                position: 'absolute',
                right: themeValue.space['3.5'],
                top: themeValue.space['3.5'],
              }}
            >
              <CopyButton content={code} />
            </div>
          </LiveEditorContainer>
        )}
      </Container>

      <div style={{ margin: `${themeValue.space['2']} 0` }}>
        <ButtonContainer>
          <div>
            <Button
              colorStyle="accentSecondary"
              size="small"
              onClick={() => setState((x) => ({ ...x, expand: !x.expand }))}
            >
              {state.expand ? 'Hide Code' : 'View Code'}
            </Button>
          </div>

          <div>
            <Button
              as="a"
              colorStyle="accentSecondary"
              href={createPlayroomLink({ code })}
              size="small"
              target="_blank"
            >
              Open in Playroom
            </Button>
          </div>
        </ButtonContainer>
      </div>
    </LiveProvider>
  )
}
