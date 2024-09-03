import * as React from 'react'

import type { WithAlert } from './utils/getValueForAlert'
import { getValueForAlert } from './utils/getValueForAlert'
import { Typography } from '../Typography/Typography'

import { AlertSVG, CrossSVG, EthSVG, UpRightArrowSVG } from '../../../index'
import type { BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'

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

type NonNullableAlert = NonNullable<BannerProps['alert']>

type ContainerProps = BoxProps & {
  $alert: NonNullableAlert
  $hasAction: boolean
}
const ContainerBox = React.forwardRef<HTMLElement, ContainerProps>(
  ({ $alert, $hasAction, ...props }, ref) => (
    <Box
      alignItems={{ base: 'stretch', sm: 'center' }}
      backgroundColor={{
        base: getValueForAlert($alert, 'background'),
        hover: getValueForAlert($alert, 'hover'),
      }}
      borderColor={getValueForAlert($alert, 'border')}
      borderRadius="$2xLarge"
      borderStyle="solid"
      borderWidth="1x"
      display="flex"
      gap={{ base: '4', sm: '6' }}
      padding={{ base: '4', sm: '6' }}
      position="relative"
      pr={$hasAction ? '$8' : undefined}
      ref={ref}
      transform={{
        base: 'translateY(0)',
        hover: $hasAction ? 'translateY(-1px)' : 'translateY(0px)',
      }}
      transitionDuration={150}
      transitionProperty="all"
      transitionTimingFunction="$ease-in-out"
      width="full"
      {...props}
    />
  ),
)

const IconBox = ({
  $alert,
  ...props
}: BoxProps & { $alert: NonNullableAlert }) => (
  <Box
    backgroundColor={getValueForAlert($alert, 'icon')}
    borderRadius="full"
    color={getValueForAlert($alert, 'svg')}
    flex="0"
    flexBasis={{ base: '$8', sm: '$10' }}
    height={{ base: '$8', sm: '$10' }}
    width={{ base: '$8', sm: '$10' }}
    {...props}
  />
)

const SVGBox = ({
  $alert,
  ...props
}: BoxProps & { $alert: NonNullableAlert }) => (
  <Box
    display="block"
    height="full"
    transform={$alert === 'info' ? 'scale(1)' : 'scale(0.5)'}
    width="full"
    {...props}
  />
)

const ActionButtonBox = (props: BoxProps) => (
  <Box
    as="button"
    backgroundColor="transparent"
    padding="$2"
    position="absolute"
    right="0"
    top="0"
    {...props}
  />
)

const ActionButtonIconBox = ({
  $alert,
  $hasAction,
  ...props
}: BoxProps & { $alert: NonNullableAlert, $hasAction: boolean }) => (
  <Box
    alignItems="center"
    backgroundColor={{
      base: getValueForAlert($alert, 'actionIcon'),
      hover: getValueForAlert($alert, 'actionIconHover'),
    }}
    borderRadius="full"
    color={{
      base: getValueForAlert($alert, 'actionSvg'),
      hover: getValueForAlert($alert, 'actionSvgHover'),
    }}
    cursor="pointer"
    display="flex"
    height="$5"
    justifyContent="center"
    transform={{
      base: 'translateY(0)',
      hover: $hasAction ? 'translateY(-1px)' : 'translateY(0px)',
    }}
    transitionDuration={150}
    transitionProperty="all"
    transitionTimingFunction="$ease-in-out"
    width="$5"
    {...props}
  />
)

const ActionButtonSVGBox = (props: BoxProps) => (
  <Box display="block" height="$3" width="$3" {...props} {...props} />
)

const ActionButton = ({
  alert = 'info',
  icon,
  hasHref,
  onDismiss,
}: Pick<BannerProps, 'alert' | 'onDismiss'> & { hasHref: boolean } & WithIcon) => {
  if (onDismiss) {
    const Icon = (icon || <CrossSVG />) as React.ReactElement
    return (
      <ActionButtonBox onClick={() => onDismiss()}>
        <ActionButtonIconBox $alert={alert} $hasAction>
          <ActionButtonSVGBox as={Icon} />
        </ActionButtonIconBox>
      </ActionButtonBox>
    )
  }
  if (hasHref || icon) {
    const Icon = (icon || <UpRightArrowSVG />) as React.ReactElement
    return (
      <ActionButtonBox as="div">
        <ActionButtonIconBox $alert={alert} $hasAction={false}>
          <ActionButtonSVGBox as={Icon} />
        </ActionButtonIconBox>
      </ActionButtonBox>
    )
  }
  return null
}

export type BannerProps = BaseProps &
  (WithAnchor | WithoutAnchor) &
  (WithIcon | WithoutIcon) &
  WithAlert

export const Banner = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<BannerProps>
>(
  (
    { title, alert = 'info', icon, as: asProp, children, onDismiss, ...props },
    ref,
  ) => {
    const Icon
      = icon
      || (alert && ['error', 'warning'].includes(alert)
        ? (
            <AlertSVG />
          )
        : (
            <EthSVG />
          ))

    const hasHref = !!props.href
    const hasAction = hasHref || !!props.onClick

    return (
      <ContainerBox
        {...props}
        $alert={alert}
        $hasAction={hasAction}
        as={asProp as any}
        ref={ref}
      >
        <IconBox $alert={alert}>
          <SVGBox $alert={alert} as={Icon as any} />
        </IconBox>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          gap="$1"
          justifyContent="center"
        >
          {title && <Typography fontVariant="largeBold">{title}</Typography>}
          <Typography>{children}</Typography>
        </Box>
        <ActionButton
          alert={alert}
          hasHref={hasHref}
          icon={props.actionIcon}
          onDismiss={onDismiss}
        />
      </ContainerBox>
    )
  },
)

Banner.displayName = 'Banner'
