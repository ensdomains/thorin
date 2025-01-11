import matter from 'gray-matter'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { readFileSync } from 'node:fs'
import { Header, Link } from '~/components'

const Home = ({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) => (
  <>
    <Header
      description={(
        <>
          Design system for
          {' '}
          <Link href="https://ens.domains">ENS</Link>
          {' '}
          built with
          {' '}
          <Link href="https://reactjs.org/">React</Link>
          .
        </>
      )}
      title="ENS Design System (alpha)"
    />
    <MDXRemote {...mdxSource} />
  </>
)

export default Home

export const getStaticProps = async () => {
  const source = readFileSync('./src/reference/index.mdx')

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    scope: data,
  })

  return {
    props: { mdxSource },
  }
}
