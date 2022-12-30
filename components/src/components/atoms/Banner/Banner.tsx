import * as React from 'react'
import styled, { css } from 'styled-components'

import { WithAlert } from '@/src/types'

import { Typography } from '../Typography'

import { AlertSVG, CrossSVG, EthSVG, RightArrowSVG } from '../..'

type BaseProps = React.PropsWithChildren<{
  message: string
  title?: string
  screen?: 'mobile' | 'desktop'
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
  as?: never
  href?: never
  target?: never
  rel?: never
  onDismiss?: () => void
}

export type Props = BaseProps & (WithAnchor | WithoutAnchor) & WithAlert

type NonNullableAlert = NonNullable<Props['alert']>

const Container = styled.div<{
  $alert: NonNullableAlert
  $screen: Props['screen']
}>(
  ({ theme, $alert, $screen }) => css`
    position: relative;
    background: ${theme.colors.backgroundPrimary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii.card};
    padding: ${theme.space[4]};
    display: flex;
    align-items: stretch;
    gap: ${theme.space[4]};
    width: ${theme.space.full};

    ${$alert === 'error' &&
    css`
      background: ${theme.colors.redSurface};
      border: 1px solid ${theme.colors.redPrimary};
    `}

    ${$alert === 'warning' &&
    css`
      background: ${theme.colors.yellowSurface};
      border: 1px solid ${theme.colors.yellowPrimary};
    `};

    ${$screen === 'desktop' &&
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
    justify-content: center;
    gap: ${theme.space[1]};
  `,
)

const IconContainer = styled.div<{
  $screen: Props['screen']
  $alert: NonNullableAlert
}>(
  ({ theme, $screen, $alert }) => css`
    width: ${theme.space[8]};
    height: ${theme.space[8]};
    flex: 0 0 ${theme.space[8]};

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    ${$screen === 'desktop' &&
    css`
      width: ${theme.space[10]};
      height: ${theme.space[10]};
      flex: 0 0 ${theme.space[10]};
    `}

    ${$alert === 'error' &&
    css`
      background: ${theme.colors.redPrimary};
      color: ${theme.colors.backgroundPrimary};
      border-radius: ${theme.radii.full};

      svg {
        transform: scale(0.5);
      }
    `}

    ${$alert === 'warning' &&
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

const Icon = ({ alert = 'info', screen }: Pick<Props, 'alert' | 'screen'>) => {
  const isAlertIcon = !!alert && ['error', 'warning'].includes(alert)
  return (
    <IconContainer $alert={alert} $screen={screen}>
      {isAlertIcon ? <AlertSVG /> : <EthSVG />}
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

const ActionButtonIconWrapper = styled.div<{ $alert: NonNullableAlert }>(
  ({ theme, $alert }) => css`
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

    ${$alert === 'error' &&
    css`
      background: ${theme.colors.backgroundPrimary};
      color: ${theme.colors.redPrimary};
    `}

    ${$alert === 'warning' &&
    css`
      background: ${theme.colors.backgroundPrimary};
      color: ${theme.colors.yellowPrimary};
    `}
  `,
)

const ActionButton = ({
  alert = 'info',
  href,
  onDismiss,
}: Pick<Props, 'alert' | 'onDismiss' | 'href'>) => {
  if (href)
    return (
      <ActionButtonContainer as="div">
        <ActionButtonIconWrapper $alert={alert}>
          <RightArrowSVG />
        </ActionButtonIconWrapper>
      </ActionButtonContainer>
    )
  if (onDismiss)
    return (
      <ActionButtonContainer onClick={() => onDismiss?.()}>
        <ActionButtonIconWrapper $alert={alert}>
          <CrossSVG />
        </ActionButtonIconWrapper>
      </ActionButtonContainer>
    )
  return null
}

export const Banner = ({
  message,
  title,
  alert = 'info',
  screen: screen,
  as: asProp,
  href,
  onDismiss,
  ...props
}: Props) => {
  return (
    <Container {...props} $alert={alert} $screen={screen} as={asProp as any}>
      <Icon alert={alert} screen={screen} />
      <Content>
        {title && <Typography typography="Large/Bold">{title}</Typography>}
        <Typography typography="Body/Normal">{message}</Typography>
      </Content>
      <ActionButton alert={alert} href={href} onDismiss={onDismiss} />
    </Container>
  )
}

Banner.displayName = 'Banner'
