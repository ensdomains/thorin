import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  ${({ theme }) => `
    backgroundColor: ${tokens.shades[theme.mode].backgroundHideFallback};
    
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    backdrop-filter: blur(30px);
    background-color: ${tokens.shades[theme.mode].backgroundHide};
  }
  `}
`

export const BackdropSurface = (props: ReactElement) => <Container {...props} />
