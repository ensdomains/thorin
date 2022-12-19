import * as React from 'react'
import styled, { css } from 'styled-components'

import { Typography } from '../Typography'

import { AlertSVG, CrossSVG, EthSVG, RightArrowSVG } from '../..'

type BaseProps = React.PropsWithChildren<{
  message: string
  title?: string
  type?: 'alert' | 'warning' | 'info'
  variant?: 'mobile' | 'desktop'
  as?: 'a'
  onDismiss?: () => void
}> &
  React.HTMLAttributes<HTMLDivElement>

type WithAnchor = {
  as: 'a'
  href: string
  target?: string
  rel?: string
  onDismiss?: never
}

type WithoutAnchor = {
  as: never
  href: never
  target: never
  rel: never
  onDismiss?: () => void
}

export type Props = BaseProps & (WithAnchor | WithoutAnchor)

const Container = styled.div<{
  $type?: Props['type']
  $variant?: Props['variant']
}>(
  ({ theme, $type, $variant }) => css`
    position: relative;
    background: ${theme.colors.backgroundPrimary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.card};
    padding: ${theme.space[4]};
    display: flex;
    align-items: flex-start;
    gap: ${theme.space[4]};
    width: ${theme.space.full};

    ${$type === 'alert' &&
    css`
      background: ${theme.colors.redSurface};
      border: 1px solid ${theme.colors.redPrimary};
    `}

    ${$type === 'warning' &&
    css`
      background: ${theme.colors.yellowSurface};
      border: 1px solid ${theme.colors.yellowPrimary};
    `};

    ${$variant === 'desktop' &&
    css`
      gap: ${theme.space[6]};
    `}
  `,
)

const Content = styled.div(
  ({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${theme.space[1]};
  `,
)

const IconContainer = styled.div<{
  $variant: Props['variant']
  $type: Props['type']
}>(
  ({ theme, $variant, $type }) => css`
    width: ${theme.space[8]};
    height: ${theme.space[8]};
    flex: 0 0 ${theme.space[8]};

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    ${$variant === 'desktop' &&
    css`
      width: ${theme.space[10]};
      height: ${theme.space[10]};
      flex: 0 0 ${theme.space[10]};
    `}

    ${$type === 'alert' &&
    css`
      background: ${theme.colors.redPrimary};
      color: ${theme.colors.backgroundPrimary};
      border-radius: ${theme.radii.full};

      svg {
        transform: scale(0.5);
      }
    `}

    ${$type === 'warning' &&
    css`
      background: ${theme.colors.yellowPrimary};
      color: ${theme.colors.backgroundPrimary};
      border-radius: ${theme.radii.full};

      svg {
        transform: scale(0.5);
      }
    `}
  `,
)

const Icon = ({ type, variant }: Pick<Props, 'type' | 'variant'>) => {
  const isAlert = !!type && ['alert', 'warning'].includes(type)
  return (
    <IconContainer $type={type} $variant={variant}>
      {isAlert ? <AlertSVG /> : <EthSVG />}
    </IconContainer>
  )
}

const ActionButtonContainer = styled.button(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    padding: ${theme.space[2]};
  `,
)

const ActionButtonIconWrapper = styled.div<{ $type: Props['type'] }>(
  ({ theme, $type }) => css`
    width: ${theme.space[5]};
    height: ${theme.space[5]};
    border-radius: ${theme.radii.full};
    background: ${theme.colors.accentSurface};
    color: ${theme.colors.accentPrimary};

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      display: block;
      width: ${theme.space[3]};
      height: ${theme.space[3]};
    }

    ${$type === 'alert' &&
    css`
      background: ${theme.colors.backgroundPrimary};
      color: ${theme.colors.redPrimary};
    `}

    ${$type === 'warning' &&
    css`
      background: ${theme.colors.backgroundPrimary};
      color: ${theme.colors.yellowPrimary};
    `}
  `,
)

const ActionButton = ({
  type,
  href,
  onDismiss,
}: Pick<Props, 'type' | 'onDismiss' | 'href'>) => {
  if (href)
    return (
      <ActionButtonContainer as="div">
        <ActionButtonIconWrapper $type={type}>
          <RightArrowSVG />
        </ActionButtonIconWrapper>
      </ActionButtonContainer>
    )
  if (onDismiss)
    return (
      <ActionButtonContainer onClick={() => onDismiss?.()}>
        <ActionButtonIconWrapper $type={type}>
          <CrossSVG />
        </ActionButtonIconWrapper>
      </ActionButtonContainer>
    )
  return null
}

export const Banner = ({
  message,
  title,
  type,
  variant,
  as: asProp,
  href,
  onDismiss,
  ...props
}: Props) => {
  return (
    <Container {...props} $type={type} $variant={variant} as={asProp as any}>
      <Icon type={type} variant={variant} />
      <Content>
        {title && <Typography variant="Large/Bold">{title}</Typography>}
        <Typography variant="Body/Normal">{message}</Typography>
      </Content>
      <ActionButton href={href} type={type} onDismiss={onDismiss} />
    </Container>
  )
}

Banner.displayName = 'Banner'
