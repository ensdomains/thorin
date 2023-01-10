import * as React from 'react'
import styled, { css } from 'styled-components'

import { mq } from '@/src/utils/responsiveHelpers'

import { Typography } from '../Typography'

export type Props = {
  title?: string
} & NativeDivProps

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space['4']};

    padding: ${theme.space['4']};
    border-radius: ${theme.radii['2xLarge']};
    background-color: ${theme.colors.backgroundPrimary};
    border: 1px solid ${theme.colors.border};

    ${mq.md.min(
      css`
        padding: ${theme.space['6']};
      `,
    )}
  `,
)

const Divider = styled.div(
  ({ theme }) => css`
    width: calc(100% + 2 * ${theme.space['4']});
    height: 1px;
    background: ${theme.colors.border};
    margin: 0 -${theme.space['4']};
    ${mq.md.min(
      css`
        margin: 0 -${theme.space['6']};
        width: calc(100% + 2 * ${theme.space['6']});
      `,
    )}
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ title, children, ...props }: Props) => {
  return (
    <Container {...props}>
      {title && <Typography fontVariant="heading4">{title}</Typography>}
      {children}
    </Container>
  )
}

Card.displayName = 'Card'
Card.Divider = Divider
