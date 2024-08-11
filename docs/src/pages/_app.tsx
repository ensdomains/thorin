import * as React from 'react'
import { AppProps } from 'next'
import { MDXProvider } from '@mdx-js/react'
// import Head from 'next/head'
import Script from 'next/script'

import { ThemeProvider } from '@ensdomains/thorin'
import '@ensdomains/thorin/style.css'
import { MDX } from '~/components'
import { getLayout as getDocsLayout } from '~/layouts/docs'
// import GlobalStyle from '~/styles/globalStyles'
// import '../styles/styles.css'

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || getDocsLayout

  return (
    <>
      {/* <Head /> */}
      {/* Prevent theme flash */}
      <Script
        dangerouslySetInnerHTML={{
          __html: `!function(){try{var d=document.documentElement;var e=document.cookie.split(";").find(x=>x.includes("mode"));if(e){d.setAttribute('data-theme',e.replace("mode=","").trim())}else{d.setAttribute('data-theme','light');}}catch(t){}}();`,
        }}
        id="prevent-theme-flash"
      />
      <MDXProvider components={MDX}>
        <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      </MDXProvider>
    </>
  )
}

export default App
