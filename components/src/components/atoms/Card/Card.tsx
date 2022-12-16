import * as React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div(
  ({ theme }) => css`
    padding: ${theme.space['6']};
    border-radius: ${theme.radii['2xLarge']};
    background-color: ${theme.colors.background};
    border: 1px solid ${theme.colors.border};
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>
export type Props = NativeDivProps

export const Card = ({ children, ...props }: Props) => {
  return <Container {...props}>{children}</Container>
}

Card.displayName = 'Card'
