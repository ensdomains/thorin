import * as React from 'react'

import type { WithAlert } from './utils/getValueForAlert'
import { getValueForAlert } from './utils/getValueForAlert'
import { Typography } from '../Typography/Typography'

import type { IconProps } from '@/src/icons'
import { AlertSVG, CrossSVG, EthSVG, UpRightArrowSVG } from '@/src/icons'
import type { AsProp, BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import * as styles from './styles.css'
import { clsx } from 'clsx'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type IconTypes = 'filledCircle' | 'normal' | 'none'

type BaseProps = {
  /** The title for the banner */
  title?: string
  as?: 'a'
  onDismiss?: () => void
  actionIcon?: React.FC
  icon?: React.FC
  iconType?: IconTypes
} & BoxProps

type WithIcon = {
  icon?: React.FC
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
  ({ $alert, $hasAction, className, style, ...props }, ref) => (
    <Box
      alignItems={{ base: 'stretch', sm: 'center' }}
      backgroundColor={{
        base: getValueForAlert($alert, 'background'),
        hover: getValueForAlert($alert, 'hover'),
      }}
      borderColor={getValueForAlert($alert, 'border')}
      borderRadius="2xLarge"
      borderStyle="solid"
      borderWidth="1x"
      display="flex"
      gap={{ base: '4', sm: '6' }}
      padding={{ base: '4', sm: '6' }}
      position="relative"
      pr={$hasAction ? '8' : undefined}
      ref={ref}
      transitionDuration={150}
      transitionProperty="all"
      transitionTimingFunction="ease-in-out"
      width="full"
      {...props}
      className={clsx(styles.containerBox, className)}
      style={{ ...style, ...assignInlineVars({
        [styles.containerBoxHasAction]: $hasAction ? 'translateY(-1px)' : 'translateY(0px)',
      }) }}
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
    flex={0}
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexBasis={{ base: '8', sm: '10' }}
    height={{ base: '8', sm: '10' }}
    width={{ base: '8', sm: '10' }}
    {...props}
  />
)

const SVGBox = ({
  $alert,
  as,
}: { as: AsProp, $alert: NonNullableAlert }) => (
  <Box
    display="block"
    height={{ base: '4', sm: '5' }}
    width={{ base: '4', sm: '5' }}
    as={as}
    className={styles.svgBoxTransform}
    style={assignInlineVars({
      [styles.svgBoxTransform]: $alert === 'info' ? 'scale(1)' : 'scale(0.5)',
    })}
  />
)

const ActionButtonBox = (props: BoxProps) => (
  <Box
    as="button"
    backgroundColor="transparent"
    padding="2"
    position="absolute"
    right="0"
    top="0"
    {...props}
  />
)

const ActionButtonIconBox = ({
  $alert,
  $hasAction,
  className,
  style,
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
    height="5"
    justifyContent="center"
    transitionDuration={150}
    transitionProperty="all"
    transitionTimingFunction="ease-in-out"
    width="5"
    {...props}
    className={
      clsx(styles.actionButtonIconBox, className)
    }
    style={{ ...style, ...assignInlineVars({
      [styles.actionButtonIconBoxHasAction]: $hasAction ? 'translateY(-1px)' : 'translateY(0px)',
    }) }}
  />
)

const ActionButtonSVGBox = (props: BoxProps) => (
  <Box display="block" height="3" width="3" {...props} />
)

const ActionButton = ({
  alert = 'info',
  icon,
  hasHref,
  onDismiss,
}: Pick<BannerProps, 'alert' | 'onDismiss'> & { hasHref: boolean } & WithIcon) => {
  if (onDismiss) {
    const Icon = (icon || CrossSVG)
    return (
      <ActionButtonBox onClick={() => onDismiss()}>
        <ActionButtonIconBox $alert={alert} $hasAction>
          <ActionButtonSVGBox as={Icon} />
        </ActionButtonIconBox>
      </ActionButtonBox>
    )
  }
  if (hasHref || icon) {
    const Icon = (icon || UpRightArrowSVG)
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

const defaultIconType = (
  alert: NonNullableAlert,
  icon?: React.FC<IconProps>,
): IconTypes => {
  if (alert !== 'info') return 'filledCircle'
  if (icon) return 'normal'
  return 'none'
}

export const Banner = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<BannerProps>
>(
  (
    { title, alert = 'info', icon, iconType, as: asProp, children, onDismiss, ...props },
    ref,
  ) => {
    const Icon
      = icon
      || (alert && ['error', 'warning'].includes(alert)
        ? (
            AlertSVG
          )
        : (
            EthSVG
          ))

    const hasHref = !!props.href
    const hasAction = hasHref || !!props.onClick
    const _iconType = iconType || defaultIconType(alert, icon)

    return (
      <ContainerBox
        {...props}
        $alert={alert}
        $hasAction={hasAction}
        as={asProp}
        ref={ref}
      >
        {_iconType !== 'none' && (
          <IconBox $alert={alert}>
            <SVGBox $alert={alert} as={Icon} />
          </IconBox>
        )}
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          gap="1"
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
