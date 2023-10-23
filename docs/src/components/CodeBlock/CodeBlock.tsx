import * as React from 'react'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import dynamic from 'next/dynamic'
import vsLight from 'prism-react-renderer/themes/vsLight'
import vsDark from 'prism-react-renderer/themes/vsDark'

import { Colors } from '@ensdomains/thorin'

import { useIsMounted } from '~/utils/isMounted'
import { PlayroomStateProvider } from '~/playroom/PlayroomState'

import { CopyButton } from '../CopyButton'
import type { Props as CodePreviewProps } from '../CodePreview'
import { PropsWithChildren } from 'react'
import { Box, useTheme } from '@ensdomains/thorin'

const CodePreviewContainer = (props: PropsWithChildren<{}>) => (
  <Box {...props} borderRadius="$large" height="$48" width="$full" />
)

const CodePreview = dynamic<CodePreviewProps>(
  () => import('../CodePreview').then((mod) => mod.CodePreview),
  {
    loading: () => <CodePreviewContainer />,
  },
)

const Pre = (props: PropsWithChildren<{}>) => (
  <Box
    {...props}
    as="pre"
    display="block"
    backgroundColor="$greySurface"
    borderRadius="$large"
    padding="$4"
    border="1px solid"
    borderColor="$border"
    position="relative"
  />
)

const LineContainer = (props: PropsWithChildren<{}>) => (
  <Box {...props} paddingRight="$8" whiteSpace="pre-wrap" />
)

const Token = (props: PropsWithChildren<{}>) => (
  <Box
    {...props}
    as="span"
    fontFamily="$mono"
    fontSize="$body"
    lineHeight="$body"
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
      {/* eslint-disable react/no-array-index-key */}
      {({
        // className,
        // style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <Pre
        // style={style}
        // className={className}
        >
          <Box position="absolute" top="$2" right="$2">
            <CopyButton content={code} />
          </Box>

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
