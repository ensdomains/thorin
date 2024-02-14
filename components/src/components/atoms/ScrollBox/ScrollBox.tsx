import * as React from 'react'
import styled, { css } from 'styled-components'

const StyledScrollBox = styled.div(
  ({ theme }) => css`
    overflow: auto;
    position: relative;

    @property --scrollbar {
      syntax: '<color>';
      inherits: true;
      initial-value: ${theme.colors.greyLight};
    }

    @property --top-line-color {
      syntax: '<color>';
      inherits: true;
      initial-value: transparent;
    }

    @property --bottom-line-color {
      syntax: '<color>';
      inherits: true;
      initial-value: transparent;
    }

    /* stylelint-disable custom-property-no-missing-var-function */
    transition: --scrollbar 0.15s ease-in-out,
      height 0.15s ${theme.transitionTimingFunction.popIn},
      --top-line-color 0.15s ease-in-out, --bottom-line-color 0.15s ease-in-out;
    /* stylelint-enable custom-property-no-missing-var-function */

    ::-webkit-scrollbar {
      width: ${theme.space['3.5']};
      transition: box-shadow 0.15s ease-in-out;
    }

    ::-webkit-scrollbar,
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }

    ::-webkit-scrollbar-button {
      display: none;
    }

    ::-webkit-scrollbar-thumb {
      transition: box-shadow 0.15s ease-in-out;
      box-shadow: inset 0 0 ${theme.space['3']} ${theme.space['3']}
        var(--scrollbar);
      border: solid ${theme.space['1']} transparent;
      border-radius: ${theme.space['3']};
      background-color: transparent;
    }

    &:hover {
      --scrollbar: ${theme.colors.greyBright};
    }

    &[data-top-line='true'] {
      --top-line-color: ${theme.colors.greyLight};
      &::before {
        z-index: 100;
      }
    }

    &[data-bottom-line='true'] {
      --bottom-line-color: ${theme.colors.greyLight};
      &::after {
        z-index: 100;
      }
    }

    ::-webkit-scrollbar-track {
      border-top: solid ${theme.space['px']} var(--top-line-color);
      border-bottom: solid ${theme.space['px']} var(--bottom-line-color);
    }

    &::before,
    &::after {
      content: '';
      position: sticky;
      left: 0;
      width: 100%;
      display: block;
      height: ${theme.space.px};
    }

    &::before {
      top: 0;
      background-color: var(--top-line-color);
    }
    &::after {
      bottom: 0;
      background-color: var(--bottom-line-color);
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
  hideDividers?: boolean | { top?: boolean; bottom?: boolean }
  topTriggerPx?: number
  bottomTriggerPx?: number
  onReachedTop?: () => void
  onReachedBottom?: () => void
} & React.HTMLAttributes<HTMLDivElement>

export const ScrollBox = ({
  hideDividers = false,
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

  const hideTop =
    typeof hideDividers === 'boolean' ? hideDividers : !!hideDividers?.top
  const hideBottom =
    typeof hideDividers === 'boolean' ? hideDividers : !!hideDividers?.bottom

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
    intersectingTop[1] !== -1 && !hideTop && setShowTop(!intersectingTop[0])
    intersectingBottom[1] !== -1 &&
      !hideBottom &&
      setShowBottom(!intersectingBottom[0])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomTriggerPx, topTriggerPx])

  React.useEffect(() => {
    funcRef.current = { onReachedTop, onReachedBottom }
  }, [onReachedTop, onReachedBottom])

  return (
    <StyledScrollBox
      data-bottom-line={showBottom}
      data-top-line={showTop}
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
