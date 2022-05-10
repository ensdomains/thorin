import * as React from 'react'

import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { darkTheme, lightTheme } from '@ensdomains/thorin'

import { PlayroomStateProvider } from './PlayroomState'

import ThorinGlobalStyles from '@/src/globalStyles'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    padding: 1.5rem;
    box-sizing: border-box;
    min-height: 100%;
    background: ${({ theme }) => theme.colors.backgroundTertiary};
  }
`

const FrameComponent = ({
  theme,
  children,
}: // theme,
React.PropsWithChildren<any>) => {
  console.log('THEME >>>>', theme)

  return (
    <>
      <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      <PlayroomStateProvider>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <GlobalStyle />
          <ThorinGlobalStyles />
          {children}
        </ThemeProvider>
      </PlayroomStateProvider>
    </>
  )
}

export default FrameComponent
