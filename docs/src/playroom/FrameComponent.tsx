import * as React from 'react'
import { ThemeProvider } from 'styled-components'

import { lightTheme } from '@ensdomains/thorin'

const FrameComponent = ({
  children,
}: // theme,
React.PropsWithChildren<any>) => (
  <>
    <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    {/*<PlayroomStateProvider>*/}
    <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    {/*</PlayroomStateProvider>*/}
  </>
)

export default FrameComponent
