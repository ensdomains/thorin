import * as React from 'react'
import styled, { css } from 'styled-components'

import { Space } from '../../../tokens/index'

const Container = styled.div(
  ({ theme }) => css`
    position: relative;
    border: solid ${theme.space.px} transparent;
    width: 100%;
    height: 100%;
    border-left-width: 0;
    border-right-width: 0;
  `,
)

const StyledScrollBox = styled.div<{ $horizontalPadding?: Space }>(
  ({ theme, $horizontalPadding }) => css`
    overflow: auto;
    position: relative;
    width: 100%;
    height: 100%;

    ${$horizontalPadding &&
    css`
      padding: 0 ${theme.space[$horizontalPadding]};
    `}

    @property --scrollbar {
      syntax: '<color>';
      inherits: true;
      initial-value: ${theme.colors.greyLight};
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
  `,
)

const IntersectElement = styled.div(
  () => css`
    display: block;
    height: 0px;
  `,
)

const Divider = styled.div<{ $horizontalPadding?: Space }>(
  ({ theme, $horizontalPadding }) => css`
    position: absolute;
    left: 0;
    height: 1px;
    width: ${theme.space.full};
    background: transparent;
    transition: background-color 0.15s ease-in-out;

    ${$horizontalPadding &&
    css`
      left: ${theme.space[$horizontalPadding]};
      width: calc(100% - 2 * ${theme.space[$horizontalPadding]});
    `}

    &[data-top-line] {
      top: -${theme.space.px};
    }

    &[data-top-line='true'] {
      background: ${theme.colors.border};
    }

    &[data-bottom-line] {
      bottom: -${theme.space.px};
    }

    &[data-bottom-line='true'] {
      background: ${theme.colors.border};
    }
  `,
)

type Props = {
  /** If true, the dividers will be hidden */
  hideDividers?: boolean | { top?: boolean; bottom?: boolean }
  /** If true, the dividers will always be shown */
  alwaysShowDividers?: boolean | { top?: boolean; bottom?: boolean }
  /** The number of pixels below the top of the content where events such as showing/hiding dividers and onReachedTop will be executed */
  topTriggerPx?: number
  /** The number of pixels above the bottom of the content where events such as showing/hiding dividers and onReachedTop will be executed */
  bottomTriggerPx?: number
  /** A callback function that is fired when the content reaches topTriggerPx */
  onReachedTop?: () => void
  /** A callback function that is fired when the content reaches bottomTriggerPx */
  onReachedBottom?: () => void
  /** The amount of horizontal padding to apply to the scrollbox. This will decrease the content area as well as the width of the overflow indicator dividers*/
  horizontalPadding?: Space
} & React.HTMLAttributes<HTMLDivElement>

export const ScrollBox = ({
  hideDividers = false,
  alwaysShowDividers = false,
  topTriggerPx = 16,
  bottomTriggerPx = 16,
  onReachedTop,
  onReachedBottom,
  horizontalPadding,
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
  const alwaysShowTop =
    typeof alwaysShowDividers === 'boolean'
      ? alwaysShowDividers
      : !!alwaysShowDividers?.top
  const alwaysShowBottom =
    typeof alwaysShowDividers === 'boolean'
      ? alwaysShowDividers
      : !!alwaysShowDividers?.bottom

  const funcRef = React.useRef<{
    onReachedTop?: () => void
    onReachedBottom?: () => void
  }>({ onReachedTop, onReachedBottom })

  const [showTop, setShowTop] = React.useState(alwaysShowTop)
  const [showBottom, setShowBottom] = React.useState(alwaysShowBottom)

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const intersectingTop: [boolean, number] = [false, -1]
    const intersectingBottom: [boolean, number] = [false, -1]
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i]
      const iref =
        entry.target === topRef.current ? intersectingTop : intersectingBottom
      if (entry.time > iref[1]) {
        iref[0] = entry.isIntersecting
        iref[1] = entry.time
      }
    }
    intersectingTop[1] !== -1 &&
      !hideTop &&
      !alwaysShowTop &&
      setShowTop(!intersectingTop[0])
    intersectingBottom[1] !== -1 &&
      !hideBottom &&
      !alwaysShowBottom &&
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
    <Container {...props}>
      <StyledScrollBox $horizontalPadding={horizontalPadding} ref={ref}>
        <IntersectElement data-testid="scrollbox-top-intersect" ref={topRef} />
        {children}
        <IntersectElement
          data-testid="scrollbox-bottom-intersect"
          ref={bottomRef}
        />
      </StyledScrollBox>
      <Divider
        $horizontalPadding={horizontalPadding}
        data-testid="scrollbox-top-line"
        data-top-line={showTop}
      />
      <Divider
        $horizontalPadding={horizontalPadding}
        data-bottom-line={showBottom}
        data-testid="scrollbox-bottom-line"
      />
    </Container>
  )
}
