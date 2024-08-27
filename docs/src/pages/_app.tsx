import * as React from 'react'
import type { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'

import { ThemeProvider } from '@ensdomains/thorin'
import '@ensdomains/thorin/dist/style.css'
import { MDX } from '~/components'
import { getLayout as getDocsLayout } from '~/layouts/docs'
import '~/styles/globalStyles.css'
import '../styles/styles.css'
import { GetLayout, NextComponentType } from 'next'

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = (Component as NextComponentType & { getLayout: GetLayout }).getLayout || getDocsLayout

  return (
    <>
      {/* <Head /> */}
      {/* Prevent theme flash */}
      <MDXProvider components={MDX}>
        <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      </MDXProvider>
    </>
  )
}

export default App
