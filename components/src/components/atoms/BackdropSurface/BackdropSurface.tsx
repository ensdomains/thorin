import type { TransitionState } from 'react-transition-state'

import styled, { css } from 'styled-components'

export const BackdropSurface = styled.div<{
  $state: TransitionState
  $empty: boolean
}>(
  ({ theme, $state, $empty }) => css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    z-index: 999;
    top: 0;
    left: 0;
    transition: ${theme.transitionDuration['300']} all
      ${theme.transitionTimingFunction.popIn};

    ${!$empty && $state === 'entered'
      ? css`
          background-color: rgba(0, 0, 0, ${theme.opacity.overlayFallback});

          @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
            backdrop-filter: blur(16px);
            background-color: rgba(0, 0, 0, ${theme.opacity.overlay});
          }
        `
      : css`
          background-color: rgba(0, 0, 0, 0);
          @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
            backdrop-filter: blur(0px);
          }
        `}
  `,
)
