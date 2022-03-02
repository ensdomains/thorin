import * as React from 'react'
import styled, { useTheme } from 'styled-components'

import { largerThan } from '@/src/utils/responsiveHelpers'
import { tokens } from '@/dist/types/tokens'

const Container = styled.div<{ dark: boolean; shadow?: boolean }>`
  ${(p) => `background-color: ${p.dark ? `black` : `white`}`};
  ${(p) =>
    !p.dark &&
    p.shadow &&
    `
        boxShadow: 0px 0px ${tokens.radii['2xLarge']} rgb('0,0,0', '0.1');
        border-radius: ${tokens.radii['2xLarge']};
        
        ${largerThan.lg`
            boxShadow: 0px 0px ${tokens.radii['3xLarge']} rgb('0,0,0', '0.1');
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
