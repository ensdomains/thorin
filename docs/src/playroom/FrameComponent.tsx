import * as React from 'react'

import { ThemeProvider } from '@ensdomains/thorin'
import '@ensdomains/thorin/dist/thorin.css'
import '../styles/frameStyle.css'

import { PlayroomStateProvider } from './PlayroomState'

const FrameComponent = ({
  theme,
  children,
}: // theme,
React.PropsWithChildren<any>) => (
  <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />

    <PlayroomStateProvider>
      <ThemeProvider defaultMode={theme}>{children}</ThemeProvider>
    </PlayroomStateProvider>
  </>
)

export default FrameComponent
