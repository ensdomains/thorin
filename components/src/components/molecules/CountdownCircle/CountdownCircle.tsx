import * as React from 'react'

import { Box, BoxProps, VisuallyHidden } from '../..'
import * as styles from './styles.css'

type Props = {
  accessibilityLabel?: string
  countdownAmount: number
  color?: BoxProps['color']
  disabled?: boolean
  callback?: () => void
} & styles.Variants

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
    ref: React.Ref<HTMLElement>,
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
      <Box position="relative">
        <Box className={styles.numberBox({ size, disabled })}>
          {disabled ? totalCount : currentCount}
        </Box>
        <Box
          className={styles.variants({ size, disabled })}
          color={color}
          ref={ref}
        >
          {accessibilityLabel && (
            <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
          )}
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle
              className={styles.circle({ finished: currentCount === 0 })}
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
        </Box>
      </Box>
    )
  },
)

CountdownCircle.displayName = 'CountdownCircle'
