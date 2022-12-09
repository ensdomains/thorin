import * as React from 'react'
import styled, { css } from 'styled-components'

const StyledScrollBox = styled.div<{ $showTop: boolean; $showBottom: boolean }>(
  ({ theme, $showTop, $showBottom }) => css`
    overflow: auto;
    position: relative;

    border-color: hsla(${theme.colors.raw.greySurface} / 1);
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
      border-color: hsla(${theme.colors.raw.greyBright} / 1);
    }

    &::before,
    &::after {
      content: '';
      position: sticky;
      left: 0;
      width: 100%;
      display: block;
      height: ${theme.space.px};
      background-color: hsla(${theme.colors.raw.greyBright} / 0);
      transition: background-color 0.15s ease-in-out;
    }

    &::before {
      top: 0;
      ${$showTop &&
      css`
        background-color: hsla(${theme.colors.raw.greyBright} / 1);
      `}
    }
    &::after {
      bottom: 0;
      ${$showBottom &&
      css`
        background-color: hsla(${theme.colors.raw.greyBright} / 1);
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
    const intersectingTop = [false, -1]
    const intersectingBottom = [false, -1]
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i]
      const iref =
        entry.target === topRef.current ? intersectingTop : intersectingBottom
      if (entry.time > iref[1]) {
        iref[0] = entry.isIntersecting
        iref[1] = entry.time
      }
    }
    intersectingTop[1] !== -1 && setShowTop(!intersectingTop[0])
    intersectingBottom[1] !== -1 && setShowBottom(!intersectingBottom[0])
    intersectingTop[0] && funcRef.current.onReachedTop?.()
    intersectingBottom[0] && funcRef.current.onReachedBottom?.()
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
