import * as React from 'react'
import { TransitionState } from 'react-transition-state'
import styled, { css, useTheme } from 'styled-components'

import { Space } from '@/src'

import { Backdrop, ExitSVG, Typography } from '../..'
import { getTestId } from '../../../utils/utils'

const IconCloseContainer = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: ${theme.space['2.5']};
    right: ${theme.space['2.5']};
    height: ${theme.space['8']};
    width: ${theme.space['8']};
    opacity: 0.5;
    cursor: pointer;
    transition-property: all;
    transition-duration: ${theme.transitionDuration['150']};
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};

    &:hover {
      opacity: 0.7;
    }
  `,
)

const Container = styled.div<{
  $state: TransitionState
  $mobile?: boolean
  $popped?: boolean
  $left?: Space
  $right?: Space
  $bottom?: Space
  $top?: Space
}>(
  ({ theme, $state, $top, $left, $right, $bottom, $mobile, $popped }) => css`
    position: fixed;
    z-index: 10000;

    width: 92.5%;
    left: 3.75%;
    top: calc(100vh / 100 * 2.5);

    ${$popped &&
    css`
      width: 95%;
      left: 2.5%;
      touch-action: none;
    `}

    ${!$mobile &&
    css`
      max-width: ${theme.space['112']};
      top: unset;
      left: unset;

      ${$top && `top: ${theme.space[$top]};`}
      ${$left && `left: ${theme.space[$left]};`}
      ${$right && `right: ${theme.space[$right]};`}
      ${$bottom && `bottom: ${theme.space[$bottom]};`}
    `}

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: ${theme.space['4.5']};

    background: hsla(${theme.colors.raw.backgroundPrimary} / 0.8);
    box-shadow: ${theme.boxShadows['0.02']};
    border: ${theme.borderWidths.px} solid ${theme.colors.greySurface};
    backdrop-filter: blur(16px);
    border-radius: ${theme.radii['2xLarge']};

    transition: ${theme.transitionDuration['300']} all
      ${theme.transitionTimingFunction.popIn};

    ${$state === 'entered'
      ? css`
          opacity: 1;
          transform: translateY(0px);
        `
      : css`
          opacity: 0;
          transform: translateY(-64px);
        `}
  `,
)

const Title = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.fontSizes.headingFour};
    line-height: ${theme.lineHeights.headingFour};
  `,
)

const DraggableContainer = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: ${theme.space['3']};
    margin-bottom: calc(-1 * ${theme.space['2']});
  `,
)

const DraggableLine = styled.div(
  ({ theme }) => css`
    width: ${theme.space['8']};
    height: ${theme.space['1']};
    border-radius: ${theme.radii['full']};
    background: ${theme.colors.border};
  `,
)

const Draggable = () => (
  <DraggableContainer>
    <DraggableLine />
  </DraggableContainer>
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = {
  onClose: () => void
  open: boolean
  msToShow?: number
  title: string
  description?: string
  children?: NativeDivProps['children']
  top?: Space
  left?: Space
  right?: Space
  bottom?: Space
  variant?: 'touch' | 'desktop'
} & Omit<NativeDivProps, 'title'>

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
}: Props & InternalProps) => {
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
      <IconCloseContainer
        as={ExitSVG}
        data-testid="toast-close-icon"
        onClick={() => onClose()}
      />
      <Title fontVariant="large" weight="bold">
        {title}
      </Title>
      <Typography>{description}</Typography>
      {children && <ActionWrapper>{children}</ActionWrapper>}
    </Container>
  )
}

const ActionWrapper = styled.div(
  ({ theme }) => css`
    margin-top: ${theme.space['3']};
    width: 100%;
  `,
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
}: Props &
  InternalProps & {
    popped: boolean
    setPopped: (popped: boolean) => void
  }) => {
  const { space } = useTheme()

  const ref = React.useRef<HTMLDivElement>(null)
  const [calcTop, setCalcTop] = React.useState(0.025 * window.innerHeight)
  const [touches, setTouches] = React.useState<Array<number | undefined>>([])

  React.useEffect(() => {
    if (open) {
      setCalcTop(0.025 * window.innerHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  React.useEffect(() => {
    const originalTop = 0.025 * window.innerHeight
    if (touches.length && !popped) {
      let didEnd = false
      let lastTouch = touches[touches.length - 1]
      if (lastTouch === undefined) {
        lastTouch = touches[touches.length - 2] || 0
        didEnd = true
      }

      const fontSize = parseInt(
        getComputedStyle(document.documentElement).fontSize,
      )
      const difference = ((touches[0] as number) - lastTouch) as number

      if (didEnd) {
        if (
          parseFloat(space['8']) * fontSize >
          (ref.current?.offsetHeight || 0) - difference
        ) {
          onClose()
        } else {
          setCalcTop(originalTop)
          setTouches([])
        }
      } else {
        if (difference * -1 > parseFloat(space['32']) * fontSize) {
          setCalcTop(originalTop * 2)
          setPopped(true)
        } else if (difference > 0) {
          setCalcTop(originalTop - difference)
        } else {
          const parabolised = 0.25 * (difference ^ 2)
          setCalcTop(originalTop - parabolised)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touches])

  const onTouchStart = React.useCallback((e: TouchEvent) => {
    e.preventDefault()
    setTouches([e.targetTouches.item(0)?.pageY])
  }, [])

  const onTouchMove = React.useCallback((e: TouchEvent) => {
    e.preventDefault()
    setTouches((touches) => [...touches, e.targetTouches.item(0)?.pageY])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popped])

  return (
    <Container
      {...{
        ...props,
        'data-testid': getTestId(props, 'toast-touch'),
        style: { top: `${calcTop}px` },
        onClick: () => setPopped(true),
        onTouchEnd: () => setTouches((touches) => [...touches, undefined]),
      }}
      $bottom={bottom}
      $left={left}
      $mobile
      $popped={popped}
      $right={right}
      $state={state}
      ref={ref}
    >
      <Title fontVariant="large" weight="bold">
        {title}
      </Title>
      <Typography>{description}</Typography>
      {popped && (
        <>
          {children && <ActionWrapper>{children}</ActionWrapper>}
          <IconCloseContainer
            as={ExitSVG}
            data-testid="toast-close-icon"
            onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
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

export const Toast = ({
  onClose,
  open,
  msToShow = 8000,
  variant = 'desktop',
  ...props
}: Props) => {
  const [popped, setPopped] = React.useState(false)
  const currentTimeout = React.useRef<number | undefined>()

  React.useEffect(() => {
    if (open) {
      setPopped(false)
      currentTimeout.current = setTimeout(() => onClose(), msToShow || 8000)
      return () => {
        clearTimeout(currentTimeout.current)
        onClose()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        variant === 'touch' ? (
          <TouchToast
            {...props}
            open={open}
            popped={popped}
            setPopped={setPopped}
            state={state}
            onClose={onClose}
          />
        ) : (
          <DesktopToast
            {...props}
            open={open}
            state={state}
            onClose={onClose}
          />
        )
      }
    </Backdrop>
  )
}

Toast.displayName = 'Toast'
