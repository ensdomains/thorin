import * as React from 'react'
import styled, { useTheme } from 'styled-components'

import { largerThan } from '@/src/utils/responsiveHelpers'
import { tokens } from '@/src/tokens'

const Container = styled.div<{ $dark: boolean; $shadow?: boolean }>`
  padding: ${tokens.space['6']};
  border-radius: ${tokens.radii['2xLarge']};

  ${largerThan.lg`
    border-radius: ${tokens.radii['3xLarge']};
  `}

  ${({ $dark: dark }) =>
    dark
      ? `background-color: ${tokens.colors.base.black};`
      : `background-color: ${tokens.colors.base.white};`}

  ${({ $dark: dark, $shadow: shadow }) =>
    !dark &&
    shadow &&
    `
        box-shadow: 0px 0px ${tokens.radii['2xLarge']} rgba(0,0,0,0.1);
        border-radius: ${tokens.radii['2xLarge']};
        
        ${largerThan.lg`
            box-shadow: 0px 0px ${tokens.radii['3xLarge']} rgba(0,0,0,0.1);
            border-radius: ${tokens.radii['3xLarge']};
        `}
    `}
`

export type Props = {
  /** Adds shadow when theme is in light mode.  */
  shadow?: boolean
}

export const Card = ({
  shadow = false,
  children,
}: React.PropsWithChildren<Props>) => {
  const { mode, forcedMode } = useTheme()
  return (
    <Container
      {...{
        $dark: (forcedMode ?? mode) === 'dark',
        $shadow: shadow,
      }}
    >
      {children}
    </Container>
  )
}
