const { glob } = require('glob')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const path = require('path')

const getComponentPaths = (category) =>
  glob
    .sync(`./src/reference/mdx/${category}/**/!(Icons[A-Z])*.docs.mdx`, {
      cwd: process.cwd(),
      absolute: true,
    })
    .map((x) => {
      const name = path.basename(x, '.docs.mdx')
      const route = `/components/${category}/${name}`
      return { name, route }
    })

// const componentPaths = glob
//   .sync('../components/src/components/**/*.docs.mdx', {
//     cwd: process.cwd(),
//     absolute: true,
//   })
//   .map((x) => {
//     const name = path.basename(x, '.docs.mdx')
//     const route = `/components/${name}`
//     return { name, route }
//   })

const config = {
  // images: {
  //   domains: ['images.mirror-media.xyz'],
  // },
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
      // {
      //   name: 'miscellaneous',
      //   links: componentPaths,
      // },
    ],
  },
  async rewrites() {
    // Rewrite playroom urls for production
    if (process.env.NODE_ENV === 'production')
      return [
        {
          source: '/playroom/preview',
          destination: '/playroom/preview/index.html',
        },
        {
          source: '/playroom/frame.html',
          destination: '/playroom/frame.html',
        },
        {
          source: '/playroom',
          destination: '/playroom/index.html',
        },
      ]
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
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

/** @type {import('next').NextConfig} */
module.exports = withMDX(config)
