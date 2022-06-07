import * as React from 'react'
import styled, { css } from 'styled-components'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Props = {
  total: number
  current: number
  max?: number
  alwaysShowFirst?: boolean
  alwaysShowLast?: boolean
  onChange: (value: number) => void
} & Omit<NativeDivProps, 'children' | 'onChange'>

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
  `,
)

const PageButton = styled.button<{ $selected?: boolean }>(
  ({ theme, $selected }) => css`
    background-color: transparent;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
    ${$selected
      ? css`
          background-color: ${theme.colors.background};
          cursor: default;
          pointer-events: none;
        `
      : css`
          &:hover {
            background-color: ${theme.colors.foregroundSecondary};
          }
        `}

    border-radius: ${theme.radii['extraLarge']};
    border: 1px solid ${theme.colors.borderSecondary};
    min-width: ${theme.space['10']};
    padding: ${theme.space['2']};
    height: ${theme.space['10']};
    font-size: ${theme.fontSizes['small']};
    font-weight: ${theme.fontWeights['medium']};
    color: ${theme.colors.text};
  `,
)

const Dots = styled.p(
  ({ theme }) => css`
    font-size: ${theme.fontSizes['small']};
    font-weight: ${theme.fontWeights['bold']};
    color: ${theme.colors.textTertiary};
  `,
)

export const PageButtons = ({
  total,
  current,
  max = 5,
  alwaysShowFirst,
  alwaysShowLast,
  onChange,
  ...props
}: Props) => {
  const maxPerSide = Math.floor(max / 2)
  const start = Math.max(
    Math.min(Math.max(current - maxPerSide, 1), total - max + 1),
    1,
  )
  const array = Array.from({ length: max }, (_, i) => start + i).filter(
    (x) => x <= total,
  )

  if (total > max) {
    if (alwaysShowFirst && start > 1) {
      array[0] = -1
      array.unshift(1)
    } else if (start > 1) {
      array.unshift(-1)
    }

    if (alwaysShowLast && total > current + maxPerSide) {
      array[array.length - 1] = -1 * total
      array.push(total)
    } else if (total > current + maxPerSide) {
      array.push(-1 * total)
    }
  }

  return (
    <Container {...{ ...props, 'data-testid': 'pagebuttons' }}>
      {array.map((value) =>
        0 > value ? (
          <Dots data-testid="pagebutton-dots" key={value}>
            ...
          </Dots>
        ) : (
          <PageButton
            $selected={value === current}
            data-testid="pagebutton"
            key={value}
            onClick={() => onChange(value)}
          >
            {value}
          </PageButton>
        ),
      )}
    </Container>
  )
}
