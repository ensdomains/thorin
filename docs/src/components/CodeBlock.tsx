import * as React from 'react'
import Highlight, {
  Language,
  PrismTheme,
  defaultProps,
} from 'prism-react-renderer'
import dynamic from 'next/dynamic'
import vsLight from 'prism-react-renderer/themes/vsLight'
import vsDark from 'prism-react-renderer/themes/vsDark'
import styled, { useTheme } from 'styled-components'

import { Colors, tokens } from '@ensdomains/thorin'

import { useIsMounted } from '~/utils/isMounted'
import { PlayroomStateProvider } from '~/playroom/PlayroomState'
import { CopyButton } from './CopyButton'
import type { Props as CodePreviewProps } from './CodePreview'

const CodePreviewContainer = styled.div`
  ${({ theme }) => `
    background-color: ${tokens.colors[theme.mode].foregroundSecondary};
    border-radius: ${tokens.radii['large']};
    height: ${tokens.space['48']};
    width: ${tokens.space['full']};
  `}
`

const CodePreview = dynamic<CodePreviewProps>(
  () => import('./CodePreview').then((mod) => mod.CodePreview),
  {
    loading: () => <CodePreviewContainer />,
  },
)

const Pre = styled.pre`
  border-radius: ${tokens.radii['2xLarge']};
  padding: ${tokens.space['6']};
  position: relative;
`

const CopyButtonContainer = styled.div`
  position: absolute;
  right: ${tokens.space['3.5']};
  top: ${tokens.space['3.5']};
`

const LineContainer = styled.div`
  padding-right: ${tokens.space['8']};
  white-space: pre-wrap;
`

const Token = styled.span`
  font-family: ${tokens.fonts['mono']};
  font-size: ${tokens.fontSizes['base']};
  line-height: ${tokens.lineHeights['1.5']};
`

type Props = {
  backgroundColor?: Colors
  children: string
  className: string
  live?: boolean
  expand?: boolean
  minHeight?: string
}

// export const CodeBlock = () => <div>code block</div>

export const CodeBlock = ({
  backgroundColor,
  children,
  className,
  live,
  expand,
  minHeight,
}: Props) => {
  const isMounted = useIsMounted()
  const { mode } = useTheme()
  const theme = mode === 'light' ? vsLight : vsDark
  const modifiedTheme: PrismTheme | undefined = isMounted
    ? {
        ...theme,
        plain: {
          ...theme.plain,
          color: tokens.colors[mode].foreground,
          backgroundColor: tokens.colors[mode].foregroundTertiary,
        },
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
