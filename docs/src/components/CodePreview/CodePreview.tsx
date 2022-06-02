import * as React from 'react'
import styled, { css, keyframes, useTheme } from 'styled-components'
import { default as NextImage } from 'next/image'
import { default as NextLink } from 'next/link'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { mdx } from '@mdx-js/react'
import { PrismTheme } from 'prism-react-renderer'

import { Button, Colors, Components } from '@ensdomains/thorin'

import ComponentWrapper from '../../playroom/ComponentWrapper'

import { createPlayroomLink } from '~/utils/playroom'
import { usePlayroomStore } from '~/playroom/PlayroomState'
import { avatars } from '~/playroom/useScope'
import { CopyButton } from '../CopyButton'
import { Stack } from '../Stack'

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

const Container = styled.div(
  ({ theme }) => css`
    background-color: ${theme.colors.background};
    border-color: ${theme.colors.foregroundSecondary};
    border-radius: ${theme.radii['2xLarge']};
    border-width: ${theme.space['0.5']};
    overflow: hidden;
    font-family: ${theme.fonts.mono};
  `,
)

const ContainerInner = styled.div<{ $expand?: boolean; ref: any }>(
  ({ theme, $expand }) => css`
    background-color: ${theme.colors.background};
    ${$expand && `border-bottom-radius: ${theme.radii['2xLarge']}`};
    border-top-left-radius: ${theme.radii['2xLarge']};
    border-top-right-radius: ${theme.radii['2xLarge']};
    overflow: scroll;
    padding: ${theme.space['6']};
  `,
)

// const LiveErrorTypography = styled(Typography)`
//   ${({ theme }) => `
//     color: ${tokens.colors[theme.mode].red};
//     font-family: ${tokens.fonts['mono']};
//   `}
// `

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
        Stack,
        keyframes,
      }}
      theme={theme}
      transformCode={(code) => '/** @jsx mdx */' + code}
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
          <div style={{ position: 'relative' }}>
            <LiveEditor onChange={(newCode) => setCode(newCode)} />

            <div style={{ position: 'absolute', right: 3.5, top: 3.5 }}>
              <CopyButton content={code} />
            </div>
          </div>
        )}
      </Container>

      <div style={{ margin: `${themeValue.space['2']} 0` }}>
        <ButtonContainer>
          <div>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setState((x) => ({ ...x, expand: !x.expand }))}
            >
              {state.expand ? 'Hide Code' : 'View Code'}
            </Button>
          </div>

          <div>
            <Button
              as="a"
              href={createPlayroomLink({ code })}
              size="small"
              target="_blank"
              variant="secondary"
            >
              Open in Playroom
            </Button>
          </div>
        </ButtonContainer>
      </div>
    </LiveProvider>
  )
}
