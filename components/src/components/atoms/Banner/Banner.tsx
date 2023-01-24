import * as React from 'react'
import styled, { css } from 'styled-components'

import { mq } from '@/src/utils/responsiveHelpers'

import { WithAlert } from '../../../types'

import { Typography } from '../Typography'

import { AlertSVG, CrossSVG, EthSVG, UpRightArrowSVG } from '../..'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type IconTypes = 'filledCircle' | 'normal' | 'none'

type BaseProps = {
  /** The title for the banner */
  title?: string
  as?: 'a'
  onDismiss?: () => void
  actionIcon?: React.ReactNode
  icon?: React.ReactNode
  iconType?: IconTypes
} & NativeDivProps

type WithIcon = {
  icon?: React.ReactNode
  iconType?: Omit<IconTypes, 'none'>
}

type WithoutIcon = {
  icon?: never
  iconType: 'none'
}

type WithAnchor = {
  as: 'a'
  href?: string
  target?: string
  rel?: string
  onDismiss?: never
  actionIcon?: React.ReactNode
}

type WithoutAnchor = {
  as?: never
  href?: never
  target?: never
  rel?: never
  onDismiss?: () => void
}

type NonNullableAlert = NonNullable<Props['alert']>

const Container = styled.div<{
  $alert: NonNullableAlert
  $hasAction: boolean
}>(
  ({ theme, $alert, $hasAction }) => css`
    position: relative;
    background: ${theme.colors.backgroundPrimary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radii['2xLarge']};
    padding: ${theme.space[4]};
    display: flex;
    align-items: stretch;
    gap: ${theme.space[4]};
    width: ${theme.space.full};
    transition: all 150ms ease-in-out;

    ${mq.md.min(
      css`
        padding: ${theme.space['6']};
        gap: ${theme.space[6]};
        align-items: center;
      `,
    )}

    ${$hasAction &&
    css`
      padding-right: ${theme.space[8]};
      &:hover {
        transform: translateY(-1px);
        background: ${theme.colors.greySurface};
        ${$alert === 'error' &&
        css`
          background: ${theme.colors.redLight};
        `}
        ${$alert === 'warning' &&
        css`
          background: ${theme.colors.yellowLight};
        `}
      }
    `}

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
  $alert: NonNullableAlert
  $type: Omit<IconTypes, 'none'>
}>(
  ({ theme, $alert, $type }) => css`
    width: ${theme.space[8]};
    height: ${theme.space[8]};
    flex: 0 0 ${theme.space[8]};

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    ${mq.md.min(css`
      width: ${theme.space[10]};
      height: ${theme.space[10]};
      flex: 0 0 ${theme.space[10]};
    `)}

    ${$type === 'filledCircle' &&
    css`
      color: ${theme.colors.backgroundPrimary};
      border-radius: ${theme.radii.full};

      svg {
        transform: scale(0.5);
      }

      ${$alert === 'info' &&
      css`
        background: ${theme.colors.text};
      `}
    `}

    ${$alert === 'error' &&
    css`
      background: ${theme.colors.redPrimary};
    `}

    ${$alert === 'warning' &&
    css`
      background: ${theme.colors.yellowPrimary};
    `}
  `,
)

const ActionButtonContainer = styled.button(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    padding: ${theme.space[2]};
  `,
)

const ActionButtonIconWrapper = styled.div<{
  $alert: NonNullableAlert
  $hasAction?: boolean
}>(
  ({ theme, $alert, $hasAction }) => css`
    width: ${theme.space[5]};
    height: ${theme.space[5]};
    border-radius: ${theme.radii.full};
    background: ${theme.colors.accentSurface};
    color: ${theme.colors.accentPrimary};
    transition: all 150ms ease-in-out;

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

    ${$hasAction &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);
        background: ${theme.colors.accentLight};
        color: ${theme.colors.accentDim};
        ${$alert === 'error' &&
        css`
          background: ${theme.colors.redLight};
          color: ${theme.colors.redDim};
        `}
        ${$alert === 'warning' &&
        css`
          background: ${theme.colors.yellowLight};
          color: ${theme.colors.yellowDim};
        `}
      }
    `}
  `,
)

const ActionButton = ({
  alert = 'info',
  icon,
  hasHref,
  onDismiss,
}: Pick<Props, 'alert' | 'onDismiss'> & { hasHref: boolean } & WithIcon) => {
  if (onDismiss)
    return (
      <ActionButtonContainer onClick={() => onDismiss()}>
        <ActionButtonIconWrapper $alert={alert} $hasAction>
          {icon || <CrossSVG />}
        </ActionButtonIconWrapper>
      </ActionButtonContainer>
    )
  if (hasHref || icon)
    return (
      <ActionButtonContainer as="div">
        <ActionButtonIconWrapper $alert={alert}>
          {icon || <UpRightArrowSVG />}
        </ActionButtonIconWrapper>
      </ActionButtonContainer>
    )
  return null
}

export type Props = BaseProps &
  (WithAnchor | WithoutAnchor) &
  (WithIcon | WithoutIcon) &
  WithAlert

const defaultIconType = (
  alert: NonNullableAlert,
  icon: React.ReactNode | undefined,
): IconTypes => {
  if (alert !== 'info') return 'filledCircle'
  if (icon) return 'normal'
  return 'none'
}

export const Banner = ({
  title,
  alert = 'info',
  icon,
  iconType,
  as: asProp,
  children,
  onDismiss,
  ...props
}: React.PropsWithChildren<Props>) => {
  const Icon =
    icon ||
    (alert && ['error', 'warning'].includes(alert) ? <AlertSVG /> : <EthSVG />)

  const hasHref = !!props.href
  const hasAction = hasHref || !!props.onClick
  const _iconType = iconType || defaultIconType(alert, icon)

  return (
    <Container
      {...props}
      $alert={alert}
      $hasAction={hasAction}
      as={asProp as any}
    >
      {_iconType !== 'none' && (
        <IconContainer $alert={alert} $type={_iconType}>
          {Icon}
        </IconContainer>
      )}
      <Content>
        {title && <Typography fontVariant="largeBold">{title}</Typography>}
        <Typography>{children}</Typography>
      </Content>
      <ActionButton
        alert={alert}
        hasHref={hasHref}
        icon={props.actionIcon}
        onDismiss={onDismiss}
      />
    </Container>
  )
}

Banner.displayName = 'Banner'
