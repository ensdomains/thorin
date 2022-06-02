import * as React from 'react'
import styled, { css } from 'styled-components'

import { mq } from '@/src/utils/responsiveHelpers'

const Container = styled.div<{ $shadow?: boolean }>(
  ({ theme, $shadow }) => css`
    padding: ${theme.space['6']};
    border-radius: ${theme.radii['2xLarge']};
    background-color: ${theme.colors.background};
    ${mq.lg.min(css`
      border-radius: ${theme.radii['3xLarge']};
    `)}

    ${$shadow &&
    theme.mode === 'light' &&
    css`
      box-shadow: 0px 0px ${theme.radii['2xLarge']} rgba(0, 0, 0, 0.1);
      border-radius: ${theme.radii['2xLarge']};
      ${mq.lg.min(css`
        box-shadow: 0px 0px ${theme.radii['3xLarge']} rgba(0, 0, 0, 0.1);
        border-radius: ${theme.radii['3xLarge']};
      `)}
    `}
  `,
)

export type Props = {
  /** Adds shadow when theme is in light mode.  */
  shadow?: boolean
}

export const Card = ({ children, shadow }: React.PropsWithChildren<Props>) => {
  return (
    <Container
      {...{
        $shadow: shadow,
      }}
    >
      {children}
    </Container>
  )
}

Card.displayName = 'Card'
