import * as React from 'react'
import styled, { useTheme } from 'styled-components'

import { largerThan } from '@/src/utils/responsiveHelpers'
import { tokens } from '@/src/tokens'

const Container = styled.div<{ dark: boolean; shadow?: boolean }>`
  padding: ${tokens.space['6']};
  border-radius: ${tokens.radii['2xLarge']};

  ${largerThan.lg`
    border-radius: ${tokens.radii['3xLarge']};
  `}

  ${({ dark }) =>
    dark
      ? `background-color: ${tokens.colors.base.black};`
      : `background-color: ${tokens.colors.base.white};`}

  ${(p) => `background-color: ${p.dark ? `black` : `white`}`};
  ${(p) =>
    !p.dark &&
    p.shadow &&
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
  shadow?: boolean
}

export const Card = ({ children, shadow }: React.PropsWithChildren<Props>) => {
  const { mode, forcedMode } = useTheme()
  return (
    <Container
      {...{
        dark: (forcedMode ?? mode) === 'dark',
        shadow,
      }}
    >
      {children}
    </Container>
  )
}
