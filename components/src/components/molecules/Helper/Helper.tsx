import * as React from 'react'
import styled, { css } from 'styled-components'

import { AlertSVG, InfoCircleSVG } from '@/src/icons'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type HelperType = 'info' | 'warning' | 'error'
type Alignment = 'horizontal' | 'vertical'

export type Props = NativeDivProps & {
  type?: HelperType
  alignment?: Alignment
  children: React.ReactNode
}

const Container = styled.div<{ $type: HelperType; $alignment: Alignment }>(
  ({ theme, $type, $alignment }) => css`
    width: ${theme.space.full};
    padding: ${theme.space['6']} ${theme.space['4']};

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.space['2']};
    border-radius: ${theme.radii.large};

    text-align: center;
    overflow-x: auto;

    ${$alignment === 'horizontal' &&
    css`
      flex-direction: row;
      justify-content: flex-start;
      gap: ${theme.space['4']};
      padding: ${theme.space['4']};
      text-align: left;
    `}

    background-color: ${theme.colors.blueSurface};
    border: ${theme.borderWidths.px} solid ${theme.colors.blue};

    ${$type === 'warning' &&
    css`
      background-color: ${theme.colors.yellowSurface};
      border-color: ${theme.colors.yellow};
    `}

    ${$type === 'error' &&
    css`
      background-color: ${theme.colors.redSurface};
      border-color: ${theme.colors.red};
    `}
  `,
)

const IconElement = styled.div<{ $type: HelperType }>(
  ({ theme, $type }) => css`
    width: ${theme.space['6']};
    height: ${theme.space['6']};

    color: ${theme.colors.blue};

    ${$type === 'warning' &&
    css`
      color: ${theme.colors.yellow};
    `}
    ${$type === 'error' &&
    css`
      color: ${theme.colors.red};
    `}
  `,
)

export const Helper = ({
  type = 'info',
  alignment = 'vertical',
  children,
  ...props
}: Props) => {
  const Icon = type === 'info' ? InfoCircleSVG : AlertSVG

  return (
    <Container $alignment={alignment} $type={type} {...props}>
      <IconElement $type={type} as={Icon} />
      {children}
    </Container>
  )
}

Helper.displayName = 'Helper'
