import * as React from 'react'
import { ThemeProvider } from 'styled-components'

// import { ThemeProvider } from '@ensdomains/thorin/components'

// import { PlayroomStateProvider } from './PlayroomState'
import './styles.css'

const FrameComponent = ({
  children,
}: // theme,
React.PropsWithChildren<any>) => (
  <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    {/*<PlayroomStateProvider>*/}
    <ThemeProvider theme={{ mode: 'light' }}>{children}</ThemeProvider>
    {/*</PlayroomStateProvider>*/}
  </>
)

export default FrameComponent
