import * as React from 'react'
import styled, { css } from 'styled-components'

import { Typography } from '../Typography'

export type Props = {
  title?: string
  variant?: 'mobile' | 'desktop'
} & NativeDivProps

const Container = styled.div<{ $variant: Props['variant'] }>(
  ({ theme, $variant }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space['4']};

    padding: ${theme.space['4']};
    border-radius: ${theme.radii.card};
    background-color: ${theme.colors.backgroundPrimary};
    border: 1px solid ${theme.colors.border};

    ${$variant === 'desktop' &&
    css`
      padding: ${theme.space['6']};
    `}
  `,
)

const Divider = styled.div<{ $variant: Props['variant'] }>(
  ({ theme, $variant }) => css`
    width: calc(100% + 2 * ${theme.space['4']});
    height: 1px;
    background: ${theme.colors.border};
    margin: 0 -${theme.space['4']};
    ${$variant === 'desktop' &&
    css`
      margin: 0 -${theme.space['6']};
      width: calc(100% + 2 * ${theme.space['6']});
    `}
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ title, variant, children, ...props }: Props) => {
  return (
    <Container {...props} $variant={variant}>
      {title && <Typography typography="Heading/H4">{title}</Typography>}
      {children}
    </Container>
  )
}

Card.displayName = 'Card'
Card.Divider = Divider
