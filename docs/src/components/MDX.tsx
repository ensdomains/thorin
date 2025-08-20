import type { MDXProviderProps } from '@mdx-js/react'
import slugify from 'slugify'

import { Typography, tokens, Box, LinkSVG } from '@ensdomains/thorin'

import { CodeBlock } from './CodeBlock/CodeBlock'
import { Link } from './Link'
import { SearchIcons } from './SearchIcons'
import { PropsTable } from './PropsTable'
import { Palette } from './Palette/Palette'
import { AdditionalColors } from './AdditionalColors/AdditionalColors'
import { Logos } from './Logos/Logos'
import { ThemingControls } from './ThemingControls'

const StyledLink = (props: React.ComponentProps<typeof Link>) => (
  <Box
    as={Link as unknown as 'a'}
    {...props}
    color="accent"
    cursor="pointer"
    // textDecoration="underline"
    // textDecorationColor="accent"
    // textUnderlineOffset="0.2em"
  />
)

export const MDX: MDXProviderProps['components'] = {
  PropsTable,
  SearchIcons,
  Palette,
  AdditionalColors,
  Logos,
  ThemingControls,
  // Default components
  // https://mdxjs.com/table-of-components/
  a: props => <StyledLink {...props} />,
  code: props => <CodeBlock {...props} />,
  h2: ({ children }) => {
    const id = slugify(children)
    return (
      <div
        style={{
          marginTop: tokens.space['12'],
          marginBottom: tokens.space['6'],
        }}
      >
        <Typography fontVariant="headingTwo" color="textPrimary" id={id}>
          <Box as="a" href={`#${id}`} display="inline">
            {children}
            <Box
              as={LinkSVG}
              display="inline-block"
              marginLeft="2"
              wh="4"
              color="greyPrimary"
            >
            </Box>
          </Box>
        </Typography>
      </div>
    )
  },
  h3: ({ children }) => (
    <Typography fontVariant="headingThree">{children}</Typography>
  ),
  inlineCode: ({ children }) => (
    <Typography as="code" fontFamily="mono" color="accent">
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <div style={{ margin: `${tokens.space['6']} 0` }}>
      <Typography as="p" color="text">
        {children}
      </Typography>
    </div>
  ),
  pre: props => (
    <div style={{ margin: `${tokens.space['6']} 0` }} {...props} />
  ),
}
