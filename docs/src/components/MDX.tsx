import { MDXProviderProps } from '@mdx-js/react'
import slugify from '@sindresorhus/slugify'
import styled, { css } from 'styled-components'

import { Heading, Typography, tokens } from '@ensdomains/thorin'

import { CodeBlock } from './CodeBlock'
import { Link } from './Link'
import { SearchIcons } from './SearchIcons'
import { PropsTable } from './PropsTable'

const HoverParent = styled.a(
  ({ theme }) => css`
    width: ${theme.space['max']};
    display: inline;
  `,
)

const HoverChild = styled.div(
  ({ theme }) => css`
    visibility: hidden;
    display: inline-block;

    ${HoverParent}:hover & {
      visibility: visible;
      margin-left: ${theme.space['2']};
      color: ${theme.colors.textTertiary};
    }
  `,
)

const InlineCode = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.accent};
    font-family: ${theme.fonts['mono']};
  `,
)

const P = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.colors.text};
    line-height: ${theme.lineHeights['1.625']};
  `,
)

const StyledLink = styled(Link)(
  ({ theme }) => css`
    color: ${theme.colors.accent};
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: ${theme.colors.accent};
    text-underline-offset: 0.2em;
  `,
)

export const MDX: MDXProviderProps['components'] = {
  PropsTable,
  SearchIcons,
  // Default components
  // https://mdxjs.com/table-of-components/
  a: (props) => <StyledLink {...props} />,
  code: (props) => <CodeBlock {...props} />,
  h2: ({ children }) => {
    const id = slugify(children)
    return (
      <div
        style={{
          marginTop: tokens.space['12'],
          marginBottom: tokens.space['6'],
        }}
      >
        <Heading color="text" id={id}>
          <HoverParent href={`#${id}`}>
            {children}
            <HoverChild>#</HoverChild>
          </HoverParent>
        </Heading>
      </div>
    )
  },
  inlineCode: ({ children }) => <InlineCode as="code">{children}</InlineCode>,
  p: ({ children }) => (
    <div style={{ margin: `${tokens.space['6']} 0` }}>
      <P as="p">{children}</P>
    </div>
  ),
  pre: (props) => (
    <div style={{ margin: `${tokens.space['6']} 0` }} {...props} />
  ),
}
