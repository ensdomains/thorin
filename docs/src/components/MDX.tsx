import { MDXProviderProps } from '@mdx-js/react'
import slugify from '@sindresorhus/slugify'
import styled from 'styled-components'

import { Heading, Typography, tokens } from '@ensdomains/thorin'

import { CodeBlock } from './CodeBlock'
import { Link } from './Link'
import { SearchIcons } from './SearchIcons'
import { PropsTable } from './PropsTable'

const HoverParent = styled.a`
  width: ${tokens.space['max']};
  display: inline;
`

const HoverChild = styled.div`
  ${({ theme }) => `
    visibility: hidden;
    display: inline-block;

    ${HoverParent}:hover & {
      visibility: visible;
      margin-left: ${tokens.space['2']};
      color: ${tokens.colors[theme.mode].textTertiary};
    }
  `}
`

const InlineCode = styled(Typography)`
  ${({ theme }) => `
    color: ${tokens.colors[theme.mode].accent};
    font-family: ${tokens.fonts['mono']};
  `}
`

const P = styled(Typography)`
  ${({ theme }) => `
    color: ${tokens.colors[theme.mode].text};
    line-height: ${tokens.lineHeights['1.625']};
  `}
`

const StyledLink = styled(Link)`
  ${({ theme }) => `
    color: ${tokens.colors[theme.mode].accent};
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: ${tokens.colors[theme.mode].accent};
    text-underline-offset: 0.2em;
  `}
`

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
        <Heading color="textPrimary" id={id}>
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
