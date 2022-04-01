import * as React from 'react'
import styled from 'styled-components'

import { VisuallyHidden } from '../..'
import { Colors, tokens } from '@/src/tokens'

interface NumberBox {
  disabled?: boolean
  size: 'small' | 'large'
}

const NumberBox = styled.div<NumberBox>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  ${({ theme }) => `
    color: ${tokens.colors[theme.mode].accent};
  `}

  ${({ theme, disabled }) =>
    disabled &&
    `
    color: ${tokens.colors[theme.mode].textPlaceholder};
  `}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: ${tokens.space['16']};
          width: ${tokens.space['16']};
        `
      case 'large':
        return `
          font-size: ${tokens.fontSizes.extraLarge};
          margin-top: -${tokens.space['0.5']};
          height: ${tokens.space['24']};
          width: ${tokens.space['24']};
        `
      default:
        return ``
    }
  }}
`

interface ContainerProps {
  disabled?: boolean
  size: 'small' | 'large'
  color: Colors
  ref: React.Ref<HTMLDivElement>
}

const Container = styled.div<ContainerProps>`
  ${({ theme }) => `
    stroke: ${tokens.colors[theme.mode].accent};
  `}

  ${({ theme, color }) => `
    color: ${tokens.colors[theme.mode][color]};
  `}

  ${({ theme, disabled }) =>
    disabled &&
    `
    color: ${tokens.colors[theme.mode].foregroundSecondary};
  `}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          height: ${tokens.space['16']};
          width: ${tokens.space['16']};
          stroke-width: ${tokens.space['1']};
        `
      case 'large':
        return `
          height: ${tokens.space['24']};
          width: ${tokens.space['24']};
          stroke-width: ${tokens.space['1']};
        `
      default:
        return ``
    }
  }}
`

interface CircleProps {
  finished: boolean
}

const Circle = styled.circle<CircleProps>`
  transition: all 1s linear, stroke-width 0.2s ease-in-out 1s;

  ${({ finished }) => finished && `stroke-width: 0;`}
`

type Props = {
  accessibilityLabel?: string
  countdownAmount: number
  color?: Colors
  disabled?: boolean
  callback?: () => void
  size?: 'small' | 'large'
}

export const CountdownCircle = React.forwardRef(
  (
    {
      accessibilityLabel,
      color = 'textSecondary',
      size = 'small',
      countdownAmount,
      disabled,
      callback,
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
      <div data-testid="countdown-circle" style={{ position: 'relative' }}>
        <NumberBox {...{ size, disabled }}>
          {disabled ? totalCount : currentCount}
        </NumberBox>
        <Container
          {...{
            size,
            disabled,
            color,
            ref,
          }}
        >
          {accessibilityLabel && (
            <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
          )}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <Circle
              cx="12"
              cy="12"
              fill="none"
              finished={currentCount === 0}
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
      </div>
    )
  },
)

CountdownCircle.displayName = 'CountdownCircle'
