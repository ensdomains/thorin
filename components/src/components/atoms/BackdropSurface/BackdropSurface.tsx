import type { TransitionState } from 'react-transition-state'

import styled, { css } from 'styled-components'

export const BackdropSurface = styled.div<{ $state: TransitionState }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  ${({ theme }) => css`
    transition: ${theme.transitionDuration['300']} all
      ${theme.transitionTimingFunction.popIn};
  `}
  ${({ theme, $state }) =>
    $state === 'entered'
      ? css`
          background-color: rgba(
            0,
            0,
            0,
            ${theme.shades.backgroundHideFallback}
          );

          @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
            backdrop-filter: blur(16px);
            background-color: ${theme.colors.backgroundHide};
          }
        `
      : css`
          background-color: rgba(0, 0, 0, 0);
          @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
            backdrop-filter: blur(0px);
          }
        `}
`
