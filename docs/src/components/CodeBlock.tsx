import * as React from 'react'
import Highlight, {
  Language,
  PrismTheme,
  defaultProps,
} from 'prism-react-renderer'
import dynamic from 'next/dynamic'
import vsLight from 'prism-react-renderer/themes/vsLight'
import styled, { css, useTheme } from 'styled-components'

import { Colors } from '@ensdomains/thorin'

import { useIsMounted } from '~/utils/isMounted'
import { PlayroomStateProvider } from '~/playroom/PlayroomState'

import { CopyButton } from './CopyButton'
import type { Props as CodePreviewProps } from './CodePreview'

const CodePreviewContainer = styled.div(
  ({ theme }) => css`
    background-color: ${theme.colors.greySurface};
    border-radius: ${theme.radii['large']};
    height: ${theme.space['48']};
    width: ${theme.space['full']};
  `,
)

const CodePreview = dynamic<CodePreviewProps>(
  () => import('./CodePreview').then((mod) => mod.CodePreview),
  {
    loading: () => <CodePreviewContainer />,
  },
)

const Pre = styled.pre(
  ({ theme }) => css`
    border-radius: ${theme.radii['2xLarge']};
    padding: ${theme.space['6']};
    position: relative;
  `,
)

const CopyButtonContainer = styled.div(
  ({ theme }) => css`
    position: absolute;
    right: ${theme.space['3.5']};
    top: ${theme.space['3.5']};
  `,
)

const LineContainer = styled.div(
  ({ theme }) => css`
    padding-right: ${theme.space['8']};
    white-space: pre-wrap;
  `,
)

const Token = styled.span(
  ({ theme }) => css`
    font-family: ${theme.fonts['mono']};
    font-size: ${theme.fontSizes.body};
    line-height: ${theme.lineHeights.body};
  `,
)

type Props = {
  backgroundColor?: Colors
  children: string
  className: string
  live?: boolean
  expand?: boolean
  minHeight?: string
}

export const CodeBlock = ({
  backgroundColor,
  children,
  className,
  live,
  expand,
  minHeight,
}: Props) => {
  const isMounted = useIsMounted()
  const { colors } = useTheme()
  const theme = vsLight
  const modifiedTheme: PrismTheme | undefined = isMounted
    ? {
        ...theme,
        plain: {
          ...theme.plain,
          color: colors.text,
          backgroundColor: colors.greySurface,
        },
        styles: [
          ...theme.styles,
          { types: ['gray'], style: { color: '#A2A2A2' } },
        ],
      }
    : undefined

  const code = children.trim().replace(RegExp('^;'), '')
  if (live)
    return (
      <PlayroomStateProvider>
        <CodePreview
          backgroundColor={backgroundColor}
          code={code}
          expand={expand}
          minHeight={minHeight}
          theme={modifiedTheme}
        />
      </PlayroomStateProvider>
    )

  const language = className?.replace(/language-/, '') as Language
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={modifiedTheme}
    >
      {/* eslint-disable react/no-array-index-key */}
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          <CopyButtonContainer>
            <CopyButton content={code} />
          </CopyButtonContainer>

          {tokens.map((line, i) => (
            <LineContainer key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <Token key={key} {...getTokenProps({ token, key })} />
              ))}
            </LineContainer>
          ))}
        </Pre>
      )}
      {/* eslint-enable react/no-array-index-key */}
    </Highlight>
  )
}
