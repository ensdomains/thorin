import * as React from 'react'

import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { PlayroomStateProvider } from './PlayroomState'

import ThorinGlobalStyles from '@/src/globalStyles'
import { tokens } from '@/src/tokens'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    padding: 1.5rem;
    box-sizing: border-box;
    min-height: 100%;
    background: ${({ theme }) => tokens.colors[theme.mode].backgroundTertiary};
  }
`

const FrameComponent = ({
  theme,
  children,
}: // theme,
React.PropsWithChildren<any>) => (
  <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    <PlayroomStateProvider>
      <ThemeProvider theme={{ mode: theme }}>
        <GlobalStyle />
        <ThorinGlobalStyles />
        {children}
      </ThemeProvider>
    </PlayroomStateProvider>
  </>
)

export default FrameComponent
