import * as React from 'react'
import type { TransitionState } from 'react-transition-state'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { match } from 'ts-pattern'

import { translateY } from '@/src/css/utils/common'

import { Typography } from '../../atoms'
import { Backdrop } from '../../molecules'
import { CrossSVG } from '../../../index'
import { commonVars } from '@/src/css/theme.css'

import { getTestId } from '../../../utils/utils'
import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import type { Space } from '@/src/tokens'
import * as styles from './styles.css'
import { clsx } from 'clsx'

const CloseIcon = (props: BoxProps) => (
  <Box
    {...props}
    as={CrossSVG}
    cursor="pointer"
    opacity={{ base: '0.5', hover: '0.7' }}
    padding="1.5"
    position="absolute"
    right="2.5"
    top="2.5"
    color={{ base: 'textAccent' }}
    transitionDuration={150}
    transitionProperty="all"
    transitionTimingFunction="inOut"
    wh="9"
  />
)

type ContainerProps = {
  $state: TransitionState
  $mobile?: boolean
  $popped?: boolean
  $left?: Space
  $right?: Space
  $bottom?: Space
  $top?: Space
}

const Container = React.forwardRef<HTMLElement, BoxProps & ContainerProps>(
  (
    { $state, $top, $left, $right, $bottom, $mobile, $popped, className, style, ...props },
    ref,
  ) => (
    <Box
      {...props}
      className={clsx(styles.container, className)}
      style={{
        ...style,
        ...assignInlineVars({
          [styles.containerLeft]: match($mobile)
            .with(true, () => ($popped ? '2.5%' : '3.75%'))
            .otherwise(() => ($left ? commonVars.space[$left] : 'unset')),
          [styles.containerRight]: match($mobile)
            .with(true, () => 'unset')
            .otherwise(() => ($right ? commonVars.space[$right] : 'unset')),
          [styles.containerTop]: match($mobile)
            .with(true, () => 'calc(100vh / 100 * 2.5)')
            .otherwise(() => ($top ? commonVars.space[$top] : 'unset')),
          [styles.containerBottom]: match($mobile)
            .with(true, () => 'unset' as const)
            .otherwise(() => ($bottom ? commonVars.space[$bottom] : 'unset')),
          [styles.containerWidth]: $popped ? '95%' : '92.5%',
          [styles.containerTransform]: $state.status === 'entered' ? translateY(0) : translateY(-64),
        }),
      }}
      alignItems="flex-start"
      borderColor="greySurface"
      borderRadius="2xLarge"
      borderStyle="solid"
      borderWidth="1x"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      maxWidth={match($mobile)
        .with(true, () => 'unset' as const)
        .otherwise(() => '112')}
      opacity={$state.status === 'entered' ? '1' : '0'}
      padding="4.5"
      position="fixed"
      ref={ref}
      touchAction={$popped ? 'none' : 'unset'}
      transitionDuration={300}
      transitionProperty="all"
      transitionTimingFunction="popIn"
      zIndex={10000}
    />
  ),
)

const Draggable = () => (
  <Box
    className={styles.draggable}
    alignItems="center"
    display="flex"
    justifyContent="center"
    paddingTop="3"
    width="full"
  >
    <Box
      backgroundColor="border"
      borderRadius="full"
      height="1"
      width="8"
    />
  </Box>
)

export type ToastProps = {
  onClose: () => void
  open: boolean
  msToShow?: number
  title: string
  description?: string
  top?: Space
  left?: Space
  right?: Space
  bottom?: Space
  variant?: 'touch' | 'desktop'
} & Omit<BoxProps, 'title' | 'color'>

type InternalProps = {
  state: TransitionState
}

const DesktopToast = ({
  onClose,
  title,
  description,
  top = '4',
  left,
  right = '4',
  bottom,
  state,
  children,
  ...props
}: ToastProps & InternalProps) => {
  return (
    <Container
      {...{
        ...props,
        'data-testid': getTestId(props, 'toast-desktop'),
      }}
      $bottom={bottom}
      $left={left}
      $mobile={false}
      $right={right}
      $state={state}
      $top={top}
    >
      <CloseIcon data-testid="toast-close-icon" onClick={() => onClose()} />
      <Typography fontVariant="headingFour">{title}</Typography>
      <Typography>{description}</Typography>
      {children && <ActionWrapper>{children}</ActionWrapper>}
    </Container>
  )
}

const ActionWrapper = (props: BoxProps) => (
  <Box {...props} marginTop="3" width="full" />
)

export const TouchToast = ({
  onClose,
  open,
  title,
  description,
  left,
  right = '4',
  bottom,
  state,
  children,
  popped,
  setPopped,
  ...props
}: ToastProps &
  InternalProps & {
    popped: boolean
    setPopped: (popped: boolean) => void
  }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [calcTop, setCalcTop] = React.useState(0.025 * window.innerHeight)
  const [touches, setTouches] = React.useState<Array<number | undefined>>([])

  React.useEffect(() => {
    if (open) {
      setCalcTop(0.025 * window.innerHeight)
    }
  }, [open])

  React.useEffect(() => {
    // const originalTop = 0.025 * window.innerHeight
    if (touches.length && !popped) {
      // let didEnd = false
      let lastTouch = touches[touches.length - 1]
      if (lastTouch === undefined) {
        lastTouch = touches[touches.length - 2] || 0
        // didEnd = true
      }

      // const fontSize = parseInt(
      //   getComputedStyle(document.documentElement).fontSize,
      // )
      // const difference = ((touches[0] as number) - lastTouch) as number

      // if (didEnd) {
      //   if (
      //     parseFloat(space['8']) * fontSize >
      //     (ref.current?.offsetHeight || 0) - difference
      //   ) {
      //     onClose()
      //   } else {
      //     setCalcTop(originalTop)
      //     setTouches([])
      //   }
      // } else {
      //   if (difference * -1 > parseFloat(space['32']) * fontSize) {
      //     setCalcTop(originalTop * 2)
      //     setPopped(true)
      //   } else if (difference > 0) {
      //     setCalcTop(originalTop - difference)
      //   } else {
      //     const parabolised = 0.25 * (difference ^ 2)
      //     setCalcTop(originalTop - parabolised)
      //   }
      // }
    }
  }, [touches])

  const onTouchStart = React.useCallback((e: TouchEvent) => {
    e.preventDefault()
    setTouches([e.targetTouches.item(0)?.pageY])
  }, [])

  const onTouchMove = React.useCallback((e: TouchEvent) => {
    e.preventDefault()
    setTouches(touches => [...touches, e.targetTouches.item(0)?.pageY])
  }, [])

  React.useEffect(() => {
    const componentRef = ref.current

    componentRef?.addEventListener('touchstart', onTouchStart, {
      passive: false,
      capture: false,
    })
    componentRef?.addEventListener('touchmove', onTouchMove, {
      passive: false,
      capture: false,
    })

    return () => {
      componentRef?.removeEventListener('touchstart', onTouchStart, {
        capture: false,
      })
      componentRef?.removeEventListener('touchmove', onTouchMove, {
        capture: false,
      })
    }
  }, [])

  React.useEffect(() => {
    const componentRef = ref.current
    if (popped) {
      componentRef?.removeEventListener('touchstart', onTouchStart, {
        capture: false,
      })
      componentRef?.removeEventListener('touchmove', onTouchMove, {
        capture: false,
      })
    }
  }, [popped])

  return (
    <Container
      {...{
        ...props,
        'data-testid': getTestId(props, 'toast-touch'),
        'style': { top: `${calcTop}px` },
        'onClick': () => setPopped(true),
        'onTouchEnd': () => setTouches(touches => [...touches, undefined]),
      }}
      bottom={bottom}
      left={left}
      $mobile
      $popped={popped}
      right={right}
      $state={state}
      ref={ref}
    >
      <Typography fontVariant="headingFour">{title}</Typography>
      <Typography>{description}</Typography>
      {popped && (
        <>
          {children && <ActionWrapper>{children}</ActionWrapper>}
          <CloseIcon
            data-testid="toast-close-icon"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          />
        </>
      )}
      {!popped && <Draggable />}
    </Container>
  )
}

export const Toast: React.FC<ToastProps> = ({
  onClose,
  open,
  msToShow = 8000,
  variant = 'desktop',
  ...props
}) => {
  const [popped, setPopped] = React.useState(false)
  const currentTimeout = React.useRef<number | undefined>()

  React.useEffect(() => {
    const originalPopped = popped
    if (open && window) {
      if (originalPopped) setPopped(false)
      currentTimeout.current = window.setTimeout(
        () => {
          onClose()
        },
        msToShow || 8000,
      )
      return () => {
        setPopped(originalPopped)
        clearTimeout(currentTimeout.current)
      }
    }
  }, [open])

  React.useEffect(() => {
    if (popped) {
      clearTimeout(currentTimeout.current)
    }
  }, [popped])

  return (
    <Backdrop
      className="toast"
      noBackground
      open={open}
      onDismiss={variant === 'touch' && popped ? () => onClose() : undefined}
    >
      {({ state }) =>
        variant === 'touch'
          ? (
              <TouchToast
                {...props}
                open={open}
                popped={popped}
                setPopped={setPopped}
                state={state}
                onClose={onClose}
              />
            )
          : (
              <DesktopToast
                {...props}
                open={open}
                state={state}
                onClose={onClose}
              />
            )}
    </Backdrop>
  )
}

Toast.displayName = 'Toast'
