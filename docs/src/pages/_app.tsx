import * as React from 'react'
import { AppProps } from 'next'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'

import { ThemeProvider } from 'styled-components'

import type { DefaultTheme } from '@ensdomains/thorin'

import { MDX } from '~/components'
import { getLayout as getDocsLayout } from '~/layouts/docs'
import GlobalStyle from '~/styles/globalStyles'

const theme: DefaultTheme = {
  mode: 'light',
}

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || getDocsLayout

  return (
    <>
      <Head>
        {/*Prevent theme flash*/}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement;var e=document.cookie.split(";").find(x=>x.includes("mode"));if(e){d.setAttribute('data-theme',e.replace("mode=","").trim())}else{d.setAttribute('data-theme','light');}}catch(t){}}();`,
          }}
        />
      </Head>
      <GlobalStyle />
      <MDXProvider components={MDX}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </MDXProvider>
    </>
  )
}

export default App
