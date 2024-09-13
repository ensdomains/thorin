import * as React from 'react'
import type { GetLayout, NextLayout } from 'next'
import Head from 'next/head'

import type {
  NavProps } from '~/components'
import {
  Header,
  Nav,
  SkipNavContent,
  SkipNavLink,
} from '~/components'

import { getLayout as getBaseLayout } from './site'
import type { BoxProps } from '@ensdomains/thorin'
import { Box, Typography } from '@ensdomains/thorin'

const Container = (props: React.ComponentProps<typeof Typography>) => (
  <Typography
    {...props}
    display="flex"
    flexDirection="column"
    backgroundColor="backgroundPrimary"
    justifyContent={{ base: 'center', lg: 'flex-end', xl: 'center' }}
    // margin="0 auto"
    width="full"
    // minHeight="100vh"
    px="6"
    boxSizing="border-box"
  />
)

const Article = (props: BoxProps) => (
  <Box
    {...props}
    as="article"
    maxWidth="192"

  // margin="0 auto"
  />
)

const Main = (props: BoxProps) => (
  <Box {...props} as="main" paddingLeft={{ base: '0', sm: '64' }} />
)

export type Props = {
  meta: {
    title: string
    description?: string
  }
}

const Layout: NextLayout<Props> = ({ children, meta }) => {
  const links = (process.env.navLinks as unknown as NavProps['links']) ?? []
  return (
    <>
      <Head>
        <title>
          {meta?.title ? `${meta.title} — ENS Design` : 'ENS Design'}
        </title>
        <meta
          content={
            meta?.description
            ?? 'Design system for ENS built with React and styled-components.'
          }
          key="description"
          name="description"
        />
      </Head>
      <SkipNavLink>Skip to content</SkipNavLink>
      <Container>
        <Main>
          <SkipNavContent />
          <Article>
            {meta && <Header {...meta} />}
            {children}
          </Article>
        </Main>
        <Nav links={links} />
      </Container>
    </>
  )
}

export const getLayout: GetLayout<Props> = page =>
  getBaseLayout(<Layout {...page.props}>{page}</Layout>)

export default Layout
