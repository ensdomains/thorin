import React, { ReactElement } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  ${({ theme }) => `
    backgroundColor: ${theme.shades.backgroundHideFallback};
    
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    backdrop-filter: blur(30px);
    background-color: ${theme.shades.backgroundHide};
  }
  `}
`

export const BackdropSurface = (props: ReactElement) => <Container {...props} />
