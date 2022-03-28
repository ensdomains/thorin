import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import { largerThan, tokens } from '@ensdomains/thorin'

import {
  Header,
  Nav,
  NavProps,
  SkipNavContent,
  SkipNavLink,
} from '~/components'
import { getLayout as getBaseLayout } from './site'

const Container = styled.div`
  display: block;
  justify-content: center;
  margin: 0 auto;
  max-width: ${tokens.space['320']};
  min-height: ${tokens.space['viewHeight']};
  padding: 0 ${tokens.space['6']};

  ${largerThan.md`
    display: flex;
    justify-content: flex-end;
  `}

  ${largerThan.lg`
    display: flex;
    justify-content: center;
  `}
`

const Aside = styled.aside`
  padding-top: ${tokens.space['6']};

  ${largerThan.md`
    left: ${tokens.space['4']};
    width: ${tokens.space['full']};
  `}

  ${largerThan.lg`
    height: ${tokens.space['viewHeight']};
    position: fixed;
    width: ${tokens.space['48']};
  `}

  ${largerThan.xl`
    width: ${tokens.space['56']};
  `}
`

const Article = styled.article`
  max-width: ${tokens.space['224']};
  padding-bottom: ${tokens.space['20']};
  padding-top: ${tokens.space['20']};

  ${largerThan.lg`
    max-width: ${tokens.space['192']};
    padding: ${tokens.space['20']} ${tokens.space['10']};
  `}

  ${largerThan.xl`
    max-width: ${tokens.space['224']};
  `}
`

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

      <Container>
        <Aside>
          <Nav links={links} />
        </Aside>

        <main>
          <SkipNavContent />
          <Article>
            {meta && <Header {...meta} />}
            {children}
          </Article>
        </main>
      </Container>
    </>
  )
}

export const getLayout: GetLayout<Props> = (page) =>
  getBaseLayout(<Layout {...page.props}>{page}</Layout>)

export default Layout
