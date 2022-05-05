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
  // padding: 0 ${tokens.space['6']};

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
  padding: ${tokens.space['6']} ${tokens.space['6']} 0 ${tokens.space['6']};

  ${largerThan.md`
    position: fixed;
    left: 0;
    width: ${tokens.space['56']};
    height: 100vh;
  `}

  ${largerThan.lg`
    position: fixed;
    left: 0;
    height: 100vh;
    width: ${tokens.space['56']};
  `} 

  ${largerThan.xl`
    position: fixed;
    left: 0;
    height: 100vh;
    width: ${tokens.space['56']};
  `};
`

const Article = styled.article`
  width: 100%;
  padding-bottom: ${tokens.space['20']};
  padding-top: ${tokens.space['20']};

  ${largerThan.md`
    max-width: ${tokens.space['224']}
  `}

  ${largerThan.lg`
    max-width: ${tokens.space['192']};
    padding: ${tokens.space['20']} ${tokens.space['10']};
  `}

  ${largerThan.xl`
    max-width: ${tokens.space['224']};
  `}
`

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 ${tokens.space['6']};

  ${largerThan.md`
    margin-left: ${tokens.space['56']}
  `}

  ${largerThan.lg`
    margin-left: ${tokens.space['56']};
  `}

  ${largerThan.xl`
    margin-left: ${tokens.space['56']};
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

        <Main>
          <SkipNavContent />
          <Article>
            {meta && <Header {...meta} />}
            {children}
          </Article>
        </Main>
      </Container>
    </>
  )
}

export const getLayout: GetLayout<Props> = (page) =>
  getBaseLayout(<Layout {...page.props}>{page}</Layout>)

export default Layout
