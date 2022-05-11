import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

import { largerThan } from '@ensdomains/thorin'

import {
  Header,
  Nav,
  NavProps,
  SkipNavContent,
  SkipNavLink,
} from '~/components'
import { getLayout as getBaseLayout } from './site'

const Container = styled.div`
  ${({ theme }) => `
    display: block;
    justify-content: center;
    margin: 0 auto;
    max-width: ${theme.space['320']};
    min-height: ${theme.space['viewHeight']};
    padding: 0 ${theme.space['6']};
  `}
`

const Aside = styled.aside`
  ${({ theme }) => `
    display: block;
    padding-top: ${theme.space['12']};
  `}

  ${({ theme }) => largerThan.md`
    height: ${theme.space['viewHeight']};
    position: fixed;
    width: ${theme.space['56']};
    padding-right: ${theme.space['12']};
  `}
`

const Article = styled.article`
  ${({ theme }) => `
    width: 100%;
    padding-bottom: ${theme.space['20']};
    padding-top: ${theme.space['20']};
  `}

  ${({ theme }) => largerThan.md`
    max-width: ${theme.space['224']}
  `}
`

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  ${({ theme }) => [
    `
    `,
    largerThan.md`
    margin-left: ${theme.space['56']}
    `,
  ]}
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
