import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'
import fs from 'fs-extra'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import { PropItem } from 'react-docgen-typescript'

import { Typography, tokens } from '@ensdomains/thorin'

import { glob } from 'glob'

import { Props as LayoutProps, getLayout } from '~/layouts/docs'
import { getComponentName, getComponentPaths } from '~/utils/fs'
import { getStaticTypes } from '~/utils/getStaticTypes'
import { createGitHubLink } from '~/utils/github'
import { Link } from '~/components'

import path from 'path'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getComponentPaths().map((x) => ({
    params: {
      slug: getComponentName(x),
    },
  })),
  fallback: false,
})

type StaticProps = {
  docsLink: string
  frontMatter: Record<string, any>
  source: MDXRemoteSerializeResult
  sourceLink: string
  staticTypes?: Record<string, PropItem>
}

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const slug = context.params?.slug as string[]
  const pathname = getComponentPaths().find(
    (x) => getComponentName(x).join('/') === slug.join('/'),
  ) as string
  const source = fs.readFileSync(pathname)
  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data,
  })
  if (slug.includes('miscellaneous')) {
    return {
      props: {
        docsLink: '',
        frontMatter: data,
        source: mdxSource,
        sourceLink: '',
        staticTypes: {},
      },
    }
  }
  const globComponentPath = glob.sync(
    `../components/src/**/${path.basename(pathname, '.docs.mdx')}.tsx`,
    {
      cwd: process.cwd(),
      absolute: true,
    },
  )
  const componentPathname = globComponentPath[0]
  const staticTypes =
    getStaticTypes(componentPathname)[slug[slug.length - 1]] ?? null
  const docsLink = createGitHubLink(pathname.replace(/^\/.*thorin/i, ''))
  const sourceLink = createGitHubLink(
    componentPathname.replace(/^\/.*thorin/i, ''),
  )

  return {
    props: {
      docsLink,
      frontMatter: data,
      source: mdxSource,
      sourceLink,
      staticTypes,
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPageWithLayout<Props> = ({
  docsLink,
  source,
  sourceLink,
  staticTypes,
}: Props) => {
  return (
    <>
      <MDXRemote
        {...source}
        scope={{
          ...source.scope,
          sourceLink,
          types: staticTypes,
        }}
      />

      {!docsLink.includes('generated') && (
        <div style={{ marginTop: tokens.space['20'] }}>
          <Link href={docsLink}>
            <Typography color="inherit" fontVariant="regularBold">
              Edit on GitHub
            </Typography>
          </Link>
        </div>
      )}
    </>
  )
}

Page.getLayout = (page) =>
  getLayout({
    ...page,
    props: {
      ...page.props,
      meta: page.props.frontMatter as LayoutProps['meta'],
    },
  })

export default Page
