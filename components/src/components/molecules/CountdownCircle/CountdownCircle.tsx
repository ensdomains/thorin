import * as React from 'react'
import styled, { css } from 'styled-components'

import { VisuallyHidden } from '../..'
import { Colors } from '@/src/tokens'
import { getTestId } from '../../../utils/utils'
import { CheckSVG } from '@/src/icons'

const CountDownContainer = styled.div(
  () => css`
    position: relative;
  `,
)

interface NumberBox {
  $disabled?: boolean
  $size: 'small' | 'large'
}

const NumberBox = styled.div<NumberBox>(
  ({ theme, $disabled, $size }) => css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    color: ${theme.colors.accent};

    ${$disabled &&
    css`
      color: ${theme.colors.greyBright};
    `}

    #countdown-complete-check {
      stroke-width: ${theme.borderWidths['1.5']};
      overflow: visible;
      display: block;
    }

    ${() => {
      switch ($size) {
        case 'small':
          return css`
            height: ${theme.space['16']};
            width: ${theme.space['16']};
          `
        case 'large':
          return css`
            font-size: ${theme.fontSizes.extraLarge};
            margin-top: -${theme.space['0.5']};
            height: ${theme.space['24']};
            width: ${theme.space['24']};
          `
        default:
          return ``
      }
    }}
  `,
)

interface ContainerProps {
  $disabled?: boolean
  $size: 'small' | 'large'
  $color: Colors
}

const Container = styled.div<ContainerProps>(
  ({ theme, $disabled, $size, $color }) => css`
    stroke: ${theme.colors.accent};

    color: ${theme.colors[$color]};

    ${$disabled &&
    css`
      color: ${theme.colors.greyBright};
    `}

    ${() => {
      switch ($size) {
        case 'small':
          return css`
            height: ${theme.space['16']};
            width: ${theme.space['16']};
            stroke-width: ${theme.space['1']};
          `
        case 'large':
          return css`
            height: ${theme.space['24']};
            width: ${theme.space['24']};
            stroke-width: ${theme.space['1']};
          `
        default:
          return ``
      }
    }}
  `,
)

interface CircleProps {
  $finished: boolean
}

const Circle = styled.circle<CircleProps>(
  ({ $finished }) => css`
    transition: all 1s linear, stroke-width 0.2s ease-in-out 1s;

    ${$finished &&
    css`
      stroke-width: 0;
    `}
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = {
  accessibilityLabel?: string
  color?: Colors
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
      color = 'textSecondary',
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
            callback && callback()
          }
          setCurrentCount(currentSeconds)
        }, 1000)
        return () => clearInterval(countInterval)
      }
    }, [calculateCurrentCount, callback, countdownSeconds, disabled])

    return (
      <CountDownContainer
        {...{
          ...props,
          'data-testid': getTestId(props, 'countdown-circle'),
        }}
      >
        <NumberBox {...{ $size: size, $disabled: disabled }}>
          {disabled && countdownSeconds}
          {!disabled &&
            (currentCount > 0 ? (
              currentCount
            ) : (
              <CheckSVG
                data-testid="countdown-complete-check"
                id="countdown-complete-check"
              />
            ))}
        </NumberBox>
        <Container $color={color} $disabled={disabled} $size={size} ref={ref}>
          {accessibilityLabel && (
            <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
          )}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <Circle
              $finished={currentCount === 0}
              cx="12"
              cy="12"
              fill="none"
              r="9"
              strokeDasharray={`${48 * (currentCount / countdownSeconds)}, 56`}
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="12"
              fill="none"
              opacity={disabled ? '1' : '0.25'}
              r="9"
              strokeLinecap="round"
            />
          </svg>
        </Container>
      </CountDownContainer>
    )
  },
)

CountdownCircle.displayName = 'CountdownCircle'
