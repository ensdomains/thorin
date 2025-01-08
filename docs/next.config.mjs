import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import path from 'node:path'
const withVanillaExtract = createVanillaExtractPlugin({ identifiers: 'short' })
import nextMDX from '@next/mdx'
import { globSync } from 'node:fs'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
})

const getComponentPaths = category =>
  globSync(`./src/reference/mdx/${category}/*.docs.mdx`, {
    cwd: process.cwd(),

  })
    .map((x) => {
      const name = path.basename(x, '.docs.mdx')
      const route = `/components/${category}/${name}`
      return { name, route }
    })

/**
  * @type {import('next').NextConfig}
*/
const config = {
  env: {
    navLinks: [
      {
        name: 'atoms',
        links: getComponentPaths('atoms'),
      },
      {
        name: 'molecules',
        links: getComponentPaths('molecules'),
      },
      {
        name: 'organisms',
        links: getComponentPaths('organisms'),
      },
    ],
  },
  pageExtensions: ['mdx', 'tsx'],
  webpack(config) {
    config.resolve.alias['@ensdomains/thorin'] = path.resolve(
      import.meta.dirname,
      '../components',
    )
    return config
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
}

/** @type {import('next').NextConfig} */
export default withVanillaExtract(withMDX(config))
