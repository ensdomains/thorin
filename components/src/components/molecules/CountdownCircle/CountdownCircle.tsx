import * as React from 'react'

import { P, match } from 'ts-pattern'

import { CheckSVG } from '@/src/icons'

import { VisuallyHidden } from '../..'
import { getTestId } from '../../../utils/utils'
import { Box, BoxProps } from '../../atoms/Box/Box'
import { getValueForNumberForSize } from './utils/getValueForNumberForSize'
import { Color, getValidatedColor } from './utils/getValidatedColor'

const NumberBox = ({
  $size,
  $color,
  disabled,
  ...props
}: BoxProps & { $size: 'small' | 'large', $color: any }) => (
  <Box
    {...props}
    alignItems="center"
    color={disabled ? '$greyPrimary' : getValidatedColor($color)}
    display="flex"
    fontSize={getValueForNumberForSize($size, 'fontSize')}
    fontWeight="$extraBold"
    justifyContent="center"
    lineHeight={getValueForNumberForSize($size, 'lineHeight')}
    marginTop={getValueForNumberForSize($size, 'marginTop')}
    position="absolute"
    wh={getValueForNumberForSize($size, 'size')}
  />
)

const ContainerBox = React.forwardRef<
  HTMLElement,
  BoxProps & {
    $size: 'small' | 'large'
    $color: Color
    disabled?: boolean
  }
>(({ $size, $color, disabled, ...props }, ref) => (
  <Box
    {...props}
    color={disabled ? '$greyLight' : getValidatedColor($color)}
    ref={ref}
    stroke="currentColor"
    strokeWidth="$1"
    wh={$size === 'large' ? '$24' : '$16'}
  />
))

const Circle = ({
  $progress,
  disabled,
  ...props
}: BoxProps & {
  $progress?: number
}) => {
  const showProgress = typeof $progress === 'number' && !disabled
  const strokeDashArray = showProgress
    ? `${48 * ($progress ?? 1)}, 56`
    : '100, 100'
  const opacity = showProgress || disabled ? '1' : '0.25'
  return (
    <Box
      {...props}
      as={(
        <circle
          cx="12"
          cy="12"
          fill="none"
          opacity={opacity}
          r="9"
          strokeDasharray={strokeDashArray}
          strokeLinecap="round"
          strokeWidth={match([!!disabled, $progress])
            .with(
              [false, P.when((x?: number) => typeof x === 'number' && x <= 0)],
              () => '0',
            )
            .otherwise(() => '4')}
        />
      )}
      transition="all 1s linear, stroke-width 0.2s ease-in-out 1s"
    />
  )
}

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = {
  accessibilityLabel?: string
  color?: Color
  startTimestamp?: number
  countdownSeconds: number
  disabled?: boolean
  callback?: () => void
  size?: 'small' | 'large'
} & Omit<NativeDivProps, 'children' | 'color'>

export const CountdownCircle = React.forwardRef(
  (
    {
      accessibilityLabel,
      color = 'accent',
      size = 'small',
      countdownSeconds,
      startTimestamp,
      disabled,
      callback,
      ...props
    }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const _startTimestamp = React.useMemo(
      () => Math.ceil((startTimestamp || Date.now()) / 1000),
      [startTimestamp],
    )
    const endTimestamp = React.useMemo(
      () => _startTimestamp + countdownSeconds,
      [_startTimestamp, countdownSeconds],
    )
    const calculateCurrentCount = React.useCallback(
      () => Math.max(endTimestamp - Math.ceil(Date.now() / 1000), 0),
      [endTimestamp],
    )

    const [currentCount, setCurrentCount] = React.useState(countdownSeconds)

    React.useEffect(() => {
      if (!disabled) {
        setCurrentCount(calculateCurrentCount())
        const countInterval = setInterval(() => {
          const currentSeconds = calculateCurrentCount()
          if (currentSeconds === 0) {
            clearInterval(countInterval)
            if (callback) callback()
          }
          setCurrentCount(currentSeconds)
        }, 1000)
        return () => clearInterval(countInterval)
      }
    }, [calculateCurrentCount, callback, countdownSeconds, disabled])

    return (
      <Box
        {...props}
        data-testid={getTestId(props, 'countdown-circle')}
        position="relative"
      >
        <NumberBox $color={color} $size={size} disabled={disabled}>
          {match([!!disabled, !!currentCount])
            .with([true, P._], () => countdownSeconds)
            .with([false, true], () => currentCount)
            .with([false, false], () => (
              <Box
                as={<CheckSVG />}
                data-testid="countdown-complete-check"
                display="block"
                id="countdown-complete-check"
                overflow="visible"
                strokeWidth="$1.5"
              />
            ))
            .exhaustive()}
        </NumberBox>
        <ContainerBox $color={color} $size={size} disabled={disabled} ref={ref}>
          {accessibilityLabel && (
            <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
          )}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <Circle
              $progress={currentCount / countdownSeconds}
              disabled={disabled}
            />
            <Circle />
          </svg>
        </ContainerBox>
      </Box>
    )
  },
)

CountdownCircle.displayName = 'CountdownCircle'
