import * as React from 'react'
import styled, { css } from 'styled-components'

import { VisuallyHidden } from '../..'
import { Colors } from '@/src/tokens'
import { getTestId } from '../../../utils/utils'

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
      color: ${theme.colors.textPlaceholder};
    `}

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
      color: ${theme.colors.foregroundSecondary};
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
  countdownAmount: number
  color?: Colors
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
      countdownAmount,
      disabled,
      callback,
      ...props
    }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const [totalCount, setTotalCount] = React.useState(0)
    const [currentCount, setCurrentCount] = React.useState(0)

    React.useEffect(() => {
      setTotalCount(countdownAmount)
      if (!disabled) {
        setCurrentCount(countdownAmount)
        const countInterval = setInterval(() => {
          setCurrentCount((prevCount) => {
            if (prevCount === 1) {
              clearInterval(countInterval)
              callback && callback()
            }
            return prevCount - 1 ? prevCount - 1 : 0
          })
        }, 1000)
        return () => clearInterval(countInterval)
      }
    }, [callback, countdownAmount, disabled])

    return (
      <CountDownContainer
        {...{
          ...props,
          'data-testid': getTestId(props, 'countdown-circle'),
        }}
      >
        <NumberBox {...{ $size: size, $disabled: disabled }}>
          {disabled ? totalCount : currentCount}
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
              strokeDasharray={`${48 * (currentCount / totalCount)}, 56`}
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
