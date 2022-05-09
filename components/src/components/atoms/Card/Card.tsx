import * as React from 'react'
import styled from 'styled-components'

import { largerThan } from '@/src/utils/responsiveHelpers'

const Container = styled.div<{ shadow?: boolean }>`
  ${({ theme }) => [
    `
  padding: ${theme.space['6']};
  border-radius: ${theme.radii['2xLarge']};
  background-color: ${theme.colors.background};
  `,
    largerThan.lg`
    border-radius: ${theme.radii['3xLarge']};
  `,
  ]}

  ${({ shadow, theme }) =>
    shadow && [
      `
      box-shadow: 0px 0px ${theme.radii['2xLarge']} rgba(0,0,0,0.1);
      border-radius: ${theme.radii['2xLarge']};
    `,
      largerThan.lg`
      box-shadow: 0px 0px ${theme.radii['3xLarge']} rgba(0,0,0,0.1);
      border-radius: ${theme.radii['3xLarge']};
    `,
    ]}
`

export type Props = {
  shadow?: boolean
}

export const Card = ({ children, shadow }: React.PropsWithChildren<Props>) => {
  return (
    <Container
      {...{
        shadow,
      }}
    >
      {children}
    </Container>
  )
}
