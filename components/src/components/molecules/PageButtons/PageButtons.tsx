import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'

type Props = {
  total: number
  current: number
  max?: number
  alwaysShowFirst?: boolean
  alwaysShowLast?: boolean
  onChange: (value: number) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${tokens.space['2']};
  flex-gap: ${tokens.space['2']};
`

const PageButton = styled.button<{ $selected?: boolean }>`
  border-radius: ${tokens.radii['extraLarge']};
  border: 1px solid ${({ theme }) => tokens.colors[theme.mode].borderSecondary};
  background-color: transparent;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  ${({ $selected, theme }) =>
    $selected
      ? `
    background-color: ${tokens.colors[theme.mode].background};
    cursor: default;
    pointer-events: none;
  `
      : `
    &:hover {
      background-color: ${tokens.colors[theme.mode].foregroundSecondary};
    }
  `}
  min-width: ${tokens.space['10']};
  padding: ${tokens.space['2']};
  height: ${tokens.space['10']};
  font-size: ${tokens.fontSizes['small']};
  font-weight: ${tokens.fontWeights['medium']};
  color: ${({ theme }) => tokens.colors[theme.mode].text};
`

const Dots = styled.p`
  font-size: ${tokens.fontSizes['small']};
  font-weight: ${tokens.fontWeights['bold']};
  color: ${({ theme }) => tokens.colors[theme.mode].textTertiary};
`

export const PageButtons = ({
  total,
  current,
  max = 5,
  alwaysShowFirst,
  alwaysShowLast,
  onChange,
}: Props) => {
  const maxPerSide = Math.floor(max / 2)
  const start = Math.min(Math.max(current - maxPerSide, 1), total - max + 1)
  const array = Array.from({ length: max }, (_, i) => start + i)

  if (alwaysShowFirst && start > 1) {
    array[0] = -1
    array.unshift(1)
  }

  if (alwaysShowLast && total > current + maxPerSide) {
    array[array.length - 1] = -1
    array.push(total)
  }

  return (
    <Container>
      {array.map((value) =>
        value === -1 ? (
          <Dots>...</Dots>
        ) : (
          <PageButton
            $selected={value === current}
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
