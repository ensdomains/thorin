import * as React from 'react'
import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import dynamic from 'next/dynamic'
import vsLight from 'prism-react-renderer/themes/vsLight'
import vsDark from 'prism-react-renderer/themes/vsDark'

import type { Colors } from '@ensdomains/thorin'

import { useIsMounted } from '~/utils/isMounted'

import { CopyButton } from '../CopyButton'
import type { Props as CodePreviewProps } from '../CodePreview'
import type { PropsWithChildren } from 'react'
import { Box, useTheme } from '@ensdomains/thorin'
import { PlayroomStateProvider } from '~/playroom/PlayroomState'

const CodePreviewContainer = (props: PropsWithChildren) => (
  <Box {...props} borderRadius="large" height="48" width="full" />
)

const CodePreview = dynamic<CodePreviewProps>(
  () => import('../CodePreview').then(mod => mod.CodePreview),
  {
    loading: () => <CodePreviewContainer />,
  },
)

const Pre = (props: PropsWithChildren) => (
  <Box
    {...props}
    as="pre"
    display="block"
    backgroundColor="greySurface"
    borderRadius="large"
    padding="4"
    borderWidth="1x"
    borderStyle="solid"
    borderColor="border"
    position="relative"
  />
)

const LineContainer = (props: PropsWithChildren) => (
  <Box {...props} paddingRight="8" whiteSpace="pre-wrap" />
)

const Token = (props: PropsWithChildren) => (
  <Box
    {...props}
    as="span"
    fontFamily="mono"
    fontSize="body"
    lineHeight="body"
  />
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
  // backgroundColor,
  children,
  className,
  live,
  expand,
  minHeight,
}: Props) => {
  const isMounted = useIsMounted()
  const theme = useTheme()
  const prismTheme = theme.mode === 'dark' ? vsDark : vsLight
  const code = children.trim().replace(RegExp('^;'), '')
  if (!isMounted) return null
  if (live)
    return (
      <PlayroomStateProvider>
        <CodePreview
        // backgroundColor={backgroundColor}
          code={code}
          expand={expand}
          minHeight={minHeight}
          theme={prismTheme}
        />
      </PlayroomStateProvider>
    )

  const language = className?.replace(/language-/, '') as Language
  return (
    <Highlight
      {...defaultProps}
      Prism={defaultProps.Prism}
      code={code}
      language={language}
      theme={prismTheme}
      // theme={modifiedTheme}
    >
      {({
        // className,
        // style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <Pre>
          <Box position="absolute" top="2" right="2">
            <CopyButton content={code} />
          </Box>
          {tokens.map((line, i) => {
            const { key: lineKey, ...lineProps } = getLineProps({ line, key: i })

            return (
              <LineContainer key={lineKey} {...lineProps}>
                {line.map((token, key) => {
                  const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key })
                  return (
                    <Token key={tokenKey} {...tokenProps} />
                  )
                })}
              </LineContainer>
            )
          })}
        </Pre>
      )}
    </Highlight>
  )
}
