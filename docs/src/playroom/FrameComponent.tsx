import * as React from 'react'

import { ThemeProvider, createGlobalStyle, css } from 'styled-components'

import { ThorinGlobalStyles, darkTheme, lightTheme } from '@ensdomains/thorin'

import { PlayroomStateProvider } from './PlayroomState'

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    html {
      height: 100%;
    }
    body {
      padding: 1.5rem;
      box-sizing: border-box;
      min-height: 100%;
      background: ${theme.colors.greyLight};
    }
  `,
)

const FrameComponent = ({
  theme,
  children,
}: // theme,
React.PropsWithChildren<any>) => (
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

export default FrameComponent
