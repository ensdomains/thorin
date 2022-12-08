import * as React from 'react'
import { GetLayout, NextLayout } from 'next'
import Head from 'next/head'
import styled, { css, useTheme } from 'styled-components'

import { mq } from '@ensdomains/thorin'

import {
  Header,
  Nav,
  NavProps,
  SkipNavContent,
  SkipNavLink,
} from '~/components'

import { getLayout as getBaseLayout } from './site'

const Container = styled.div(
  ({ theme }) => css`
    display: block;
    justify-content: center;
    margin: 0 auto;
    max-width: ${theme.space['320']};
    min-height: ${theme.space['viewHeight']};
    padding: 0 ${theme.space['6']};

    ${mq.lg.min(css`
      display: flex;
      justify-content: flex-end;
    `)}

    ${mq.xl.min(css`
      display: flex;
      justify-content: center;
    `)}
  `,
)

const Aside = styled.aside(
  ({ theme }) => css`
    padding-top: ${theme.space['6']};
    background-color: ${theme.colors.greyBright};

    ${mq.lg.min(css`
      background-color: ${theme.colors.greyBright};
      margin-right: ${theme.space['10']};
      border-radius: ${theme.radii['extraLarge']};

      left: ${theme.space['4']};
      top: ${theme.space['4']};
      bottom: ${theme.space['4']};

      height: calc(${theme.space['viewHeight']} - ${theme.space['8']});
      padding: ${theme.space['4']};
      overflow: hidden;
      position: fixed;
      width: ${theme.space['48']};
    `)}

    ${mq.xl.min(css`
      width: ${theme.space['56']};
    `)}
  `,
)

const Article = styled.article(
  ({ theme }) => css`
    width: 100%;
    padding-bottom: ${theme.space['20']};
    padding-top: ${theme.space['20']};

    ${mq.lg.min(css`
      max-width: ${theme.space['192']};
      padding: ${theme.space['20']} ${theme.space['10']};
    `)}

    ${mq.xl.min(css`
      max-width: ${theme.space['224']};
    `)}
  `,
)

const Main = styled.main(
  ({ theme }) => css`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    ${mq.lg.min(css`
      justify-content: flex-end;
      margin-left: ${theme.space['56']};
    `)}
    ${mq.xl.min(css`
      justify-content: center;
    `)}
  `,
)

export type Props = {
  meta: {
    title: string
    description?: string
  }
}

const Layout: NextLayout<Props> = ({ children, meta }) => {
  const { colors } = useTheme()
  const links = (process.env.navLinks as unknown as NavProps['links']) ?? []

  console.log(colors)
  return (
    <>
      <Head>
        <title>
          {meta?.title ? `${meta.title} — ENS Design` : 'ENS Design'}
        </title>
        <meta
          content={
            meta?.description ??
            'Design system for ENS built with React and styled-components.'
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
