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
  async rewrites() {
    // Rewrite playroom urls for production
    // if (process.env.NODE_ENV === 'production')
    //   return [
    //     {
    //       source: '/playroom/preview',
    //       destination: '/playroom/preview/index.html',
    //     },
    //     {
    //       source: '/playroom/frame.html',
    //       destination: '/playroom/frame.html',
    //     },
    //     {
    //       source: '/playroom',
    //       destination: '/playroom/index.html',
    //     },
    //   ]
    return []
  },
  async redirects() {
    if (process.env.NODE_ENV === 'production') return []
    // Redirect playroom to local dev server in development
    return [
      {
        source: '/playroom',
        destination: 'http://localhost:8082',
        permanent: false,
      },
    ]
  },
  pageExtensions: ['mdx', 'tsx'],
  webpack(config) {
    config.resolve.alias['@ensdomains/thorin'] = path.resolve(
      import.meta.dirname,
      '../components',
    )
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    })
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
