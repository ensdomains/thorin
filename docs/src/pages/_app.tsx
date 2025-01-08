import * as React from 'react'
import type { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'

import type { Mode } from '@ensdomains/thorin'
import { ThemeProvider } from '@ensdomains/thorin'
import '@ensdomains/thorin/dist/thorin.css'
import { MDX } from '~/components'
import { getLayout as getDocsLayout } from '~/layouts/docs'
import '~/styles/globalStyles.css'
import '../styles/styles.css'
import type { GetLayout, NextComponentType } from 'next'

declare global {
  interface Window {
    __theme: Mode
    __setPreferredTheme: (theme: Mode) => void
    __onThemeChange: (theme: Mode) => void
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = (Component as NextComponentType & { getLayout: GetLayout }).getLayout || getDocsLayout

  return (
    <>
      {/* <Head /> */}
      {/* Prevent theme flash */}
      <MDXProvider components={MDX}>
        <ThemeProvider
          onThemeChange={mode => window.__setPreferredTheme(mode)}
          defaultMode={typeof window !== 'undefined' ? window.__theme : 'light'}
        >
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </MDXProvider>
    </>
  )
}

export default App
