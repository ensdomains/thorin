import * as React from 'react'
import styled, { css } from 'styled-components'

const StyledScrollBox = styled.div<{ $showTop: boolean; $showBottom: boolean }>(
  ({ theme, $showTop, $showBottom }) => css`
    overflow: auto;
    position: relative;

    border-color: rgba(${theme.shadesRaw.foreground}, 0.05);
    transition: border-color 0.15s ease-in-out;

    /* stylelint-disable-next-line selector-pseudo-element-no-unknown */
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: ${theme.space['1.5']};
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border: none;
      border-radius: ${theme.radii.full};
      border-right-style: inset;
      border-right-width: calc(100vw + 100vh);
      border-color: inherit;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &:hover {
      border-color: rgba(${theme.shadesRaw.foreground}, 0.2);
    }

    &::before,
    &::after {
      content: '';
      position: sticky;
      left: 0;
      width: 100%;
      display: block;
      height: ${theme.space.px};
      background-color: rgba(${theme.shadesRaw.foreground}, 0);
      transition: background-color 0.15s ease-in-out;
    }

    &::before {
      top: 0;
      ${$showTop &&
      css`
        background-color: rgba(${theme.shadesRaw.foreground}, 0.1);
      `}
    }
    &::after {
      bottom: 0;
      ${$showBottom &&
      css`
        background-color: rgba(${theme.shadesRaw.foreground}, 0.1);
      `}
    }
  `,
)

const IntersectElement = styled.div(
  () => css`
    display: block;
    height: 0px;
  `,
)

type Props = {
  topTriggerPx?: number
  bottomTriggerPx?: number
  onReachedTop?: () => void
  onReachedBottom?: () => void
} & React.HTMLAttributes<HTMLDivElement>

export const ScrollBox = ({
  topTriggerPx = 16,
  bottomTriggerPx = 16,
  onReachedTop,
  onReachedBottom,
  children,
  ...props
}: Props) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const topRef = React.useRef<HTMLDivElement>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  const funcRef = React.useRef<{
    onReachedTop?: () => void
    onReachedBottom?: () => void
  }>({ onReachedTop, onReachedBottom })

  const [showTop, setShowTop] = React.useState(false)
  const [showBottom, setShowBottom] = React.useState(false)

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const intersectingTop =
      entries.find((entry) => entry.target === topRef.current)
        ?.isIntersecting || false
    const intersectingBottom =
      entries.find((entry) => entry.target === bottomRef.current)
        ?.isIntersecting || false
    if (intersectingTop && intersectingBottom) {
      // do nothing because the div isn't scrollable
      return
    }
    setShowTop(!intersectingTop)
    setShowBottom(!intersectingBottom)
    intersectingTop && funcRef.current.onReachedTop?.()
    intersectingBottom && funcRef.current.onReachedBottom?.()
  }

  React.useEffect(() => {
    const el = ref.current
    const topEl = topRef.current
    const bottomEl = bottomRef.current
    let observer: IntersectionObserver
    if (el && topEl && bottomEl) {
      observer = new IntersectionObserver(handleIntersect, {
        root: el,
        threshold: 1,
        rootMargin: `${topTriggerPx}px 0px ${bottomTriggerPx}px 0px`,
      })
      observer.observe(topEl)
      observer.observe(bottomEl)
    }
    return () => {
      observer.disconnect()
    }
  }, [bottomTriggerPx, topTriggerPx])

  React.useEffect(() => {
    funcRef.current = { onReachedTop, onReachedBottom }
  }, [onReachedTop, onReachedBottom])

  return (
    <StyledScrollBox
      $showBottom={showBottom}
      $showTop={showTop}
      ref={ref}
      {...props}
    >
      <IntersectElement data-testid="scrollbox-top-intersect" ref={topRef} />
      {children}
      <IntersectElement
        data-testid="scrollbox-bottom-intersect"
        ref={bottomRef}
      />
    </StyledScrollBox>
  )
}
