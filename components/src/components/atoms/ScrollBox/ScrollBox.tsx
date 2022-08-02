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
  ...props
}: Props) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const [showTop, setShowTop] = React.useState(false)
  const [showBottom, setShowBottom] = React.useState(false)

  const setScrollValues = React.useCallback(
    (scrollTop: number, scrollHeight: number, clientHeight: number) => {
      const _showTop = scrollTop > topTriggerPx
      const _showBottom =
        scrollHeight - scrollTop > clientHeight + bottomTriggerPx
      setShowTop((prev) => {
        if (_showTop !== prev) {
          if (!_showTop) {
            onReachedTop?.()
          }
        }
        return _showTop
      })
      setShowBottom((prev) => {
        if (_showBottom !== prev) {
          if (!_showBottom) {
            onReachedBottom?.()
          }
        }
        return _showBottom
      })
    },
    [topTriggerPx, bottomTriggerPx, onReachedTop, onReachedBottom],
  )

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    setScrollValues(scrollTop, scrollHeight, clientHeight)
  }

  React.useEffect(() => {
    const _ref = ref.current
    if (_ref) {
      const { scrollTop, scrollHeight, clientHeight } = _ref
      setScrollValues(scrollTop, scrollHeight, clientHeight)
    }
  }, [setScrollValues])

  return (
    <StyledScrollBox
      $showBottom={showBottom}
      $showTop={showTop}
      ref={ref}
      onScroll={handleScroll}
      {...props}
    />
  )
}
