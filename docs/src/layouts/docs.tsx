import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'

import { Box } from '@ensdomains/thorin/components'

import {
  Header,
  Nav,
  NavProps,
  SkipNavContent,
  SkipNavLink,
} from '~/components'
import { getLayout as getBaseLayout } from './site'

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
            meta?.description ??
            'Design system for ENS built with React and vanilla-extract.'
          }
          key="description"
          name="description"
        />
      </Head>

      <SkipNavLink>Skip to content</SkipNavLink>

      <Box
        display={{ xs: 'block', lg: 'flex' }}
        justifyContent={{ xs: 'center', md: 'flex-end', xl: 'center' }}
        marginX="auto"
        maxWidth="320"
        minHeight="viewHeight"
        paddingX="6"
      >
        <Box
          as="aside"
          height={{ lg: 'viewHeight' }}
          left={{ md: '4' }}
          paddingTop="6"
          position={{ lg: 'fixed' }}
          width={{ md: 'full', lg: '48', xl: '56' }}
        >
          <Nav links={links} />
        </Box>

        <Box as="main">
          <SkipNavContent />
          <Box
            as="article"
            maxWidth={{ xs: '224', lg: '192', xl: '224' }}
            paddingBottom="20"
            paddingTop="20"
            paddingX={{ lg: '10' }}
          >
            {meta && <Header {...meta} />}

            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export const getLayout: GetLayout<Props> = (page) =>
  getBaseLayout(<Layout {...page.props}>{page}</Layout>)

export default Layout
