import * as React from 'react'
import { TransitionState } from 'react-transition-state'
import styled, { css, useTheme } from 'styled-components'

import { Colors, Space } from '@/src'

import { Backdrop, ExitSVG, Typography } from '../..'

const IconCloseContainer = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: ${theme.space['2.5']};
    right: ${theme.space['2.5']};
    height: ${theme.space['8']};
    width: ${theme.space['8']};
    opacity: ${theme.opacity['50']};
    cursor: pointer;
    transition-propery: all;
    transition-duration: ${theme.transitionDuration['150']};
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};

    &:hover {
      opacity: ${theme.opacity['70']};
    }
  `}
`

const Container = styled.div<{
  $state: TransitionState
  $mobile?: boolean
  $popped?: boolean
  $left?: Space
  $right?: Space
  $bottom?: Space
  $top?: Space
}>`
  ${({ theme, $state, $top, $left, $right, $bottom, $mobile, $popped }) => css`
    position: fixed;
    z-index: 1000;

    width: 92.5%;
    left: 3.75%;
    top: calc(100vh / 100 * 2.5);

    ${$popped &&
    css`
      width: 95%;
      left: 2.5%;
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

    background: rgba(${theme.shadesRaw.background}, 0.8);
    box-shadow: ${theme.boxShadows['0.02']};
    border: ${theme.borderWidths.px} solid ${theme.colors.foregroundSecondary};
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
  `}
`

const Title = styled(Typography)`
  ${({ theme }) => css`
    line-height: ${theme.lineHeights.normal};
  `}
`

const DraggableContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => `
    padding-top: ${theme.space['3']};
    margin-bottom: calc(-1 * ${theme.space['2']});
  `}
`

const DraggableLine = styled.div`
  ${({ theme }) => css`
    width: ${theme.space['8']};
    height: ${theme.space['1']};
    border-radius: ${theme.radii['full']};
    background: ${theme.colors.border};
  `}
`

const Draggable = () => (
  <DraggableContainer>
    <DraggableLine />
  </DraggableContainer>
)

type Props = {
  onClose: () => void
  open: boolean
  msToShow?: number
  tag?: {
    name: string
    color: Colors
  }
  title: string
  description?: string
  children?: React.ReactNode
  top?: Space
  left?: Space
  right?: Space
  bottom?: Space
  variant?: 'touch' | 'desktop'
}

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
}: Props & InternalProps) => {
  return (
    <Container
      $bottom={bottom}
      $left={left}
      $mobile={false}
      $right={right}
      $state={state}
      $top={top}
      data-testid="toast-desktop"
    >
      <IconCloseContainer
        as={ExitSVG}
        data-testid="close-icon"
        onClick={() => onClose()}
      />
      <Title variant="large" weight="bold">
        {title}
      </Title>
      <Typography>{description}</Typography>
      {children && <ActionWrapper>{children}</ActionWrapper>}
    </Container>
  )
}

const ActionWrapper = styled.div`
  ${({ theme }) => `
    margin-top: ${theme.space['3']};
    width: 100%;
  `}
`

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
        console.log(difference * -1, parseFloat(space['32']) * fontSize)
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

  return (
    <Container
      $bottom={bottom}
      $left={left}
      $mobile
      $popped={popped}
      $right={right}
      $state={state}
      data-testid="toast-touch"
      ref={ref}
      style={{ top: `${calcTop}px` }}
      onClick={() => setPopped(true)}
      onTouchEnd={() => setTouches((touches) => [...touches, undefined])}
      onTouchMove={(e) =>
        setTouches((touches) => [...touches, e.targetTouches.item(0).pageY])
      }
      onTouchStart={(e) => setTouches([e.targetTouches.item(0).pageY])}
    >
      <Title variant="large" weight="bold">
        {title}
      </Title>
      <Typography>{description}</Typography>
      {popped && (
        <>
          {children && <ActionWrapper>{children}</ActionWrapper>}
          <IconCloseContainer
            as={ExitSVG}
            data-testid="close-icon"
            onClick={() => onClose()}
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

  React.useEffect(() => {
    if (open) {
      setPopped(false)
      const timeout = setTimeout(() => onClose(), msToShow || 8000)
      return () => {
        clearTimeout(timeout)
        onClose()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Backdrop
      className="toast"
      noBackground
      open={open}
      onDismiss={() => {
        if (variant === 'touch' && popped) {
          onClose()
        }
      }}
    >
      {({ state }) =>
        variant === 'touch' ? (
          <TouchToast
            {...{
              ...props,
              open,
              onClose,
              state,
              popped,
              setPopped,
            }}
          />
        ) : (
          <DesktopToast {...{ ...props, open, onClose, state }} />
        )
      }
    </Backdrop>
  )
}

Toast.displayName = 'Toast'