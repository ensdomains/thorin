import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'

interface ContainerProps {
  $hover?: boolean
  $size: 'small' | 'medium'
  $tone: 'accent' | 'blue' | 'green' | 'secondary' | 'red'
}

const Container = styled.div<ContainerProps>`
  line-height: normal;
  align-items: center;
  display: flex;
  border-radius: ${tokens.radii['full']};
  font-weight: ${tokens.fontWeights['medium']};
  width: ${tokens.space['max']};

  ${({ $hover }) =>
    $hover &&
    `
      transition-duration: ${tokens.transitionDuration['150']};
      transition-property: color, border-color, background-color;
      transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  `}

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return `
          height: ${tokens.space['5']};
          font-size: ${tokens.fontSizes['label']};
        `
      case 'medium':
        return `
          height: ${tokens.space['6']};
          font-size: ${tokens.fontSizes['small']};
        `
      default:
        return ``
    }
  }}

  ${({ $tone, theme }) => {
    switch ($tone) {
      case 'accent':
        return `
          color: ${tokens.colors[theme.mode].accent};
          background-color: ${tokens.colors[theme.mode].accentTertiary};
        `
      case 'secondary':
        return `
          color: ${tokens.colors[theme.mode].textTertiary};
          background-color: ${tokens.colors[theme.mode].foregroundTertiary};
        `
      case 'blue':
        return `
          color: ${tokens.colors[theme.mode].blue};
          background-color: rgba(${tokens.accentsRaw[theme.mode].blue}, calc(${
          tokens.shades[theme.mode].accentSecondary
        } * 0.5));
        `
      case 'green':
        return `
          color: ${tokens.colors[theme.mode].green};
          background-color: rgba(${tokens.accentsRaw[theme.mode].green}, calc(${
          tokens.shades[theme.mode].accentSecondary
        } * 0.5));
        `
      case 'red':
        return `
          color: ${tokens.colors[theme.mode].red};
          background-color: rgba(${tokens.accentsRaw[theme.mode].red}, calc(${
          tokens.shades[theme.mode].accentSecondary
        } * 0.5));
        `
      default:
        return ``
    }
  }}
  
  ${({ $hover, $tone, theme }) => {
    if ($hover && $tone === 'accent')
      return `
        background-color: ${tokens.colors[theme.mode].accentTertiary};
      
        &:hover, &:active {
        background-color: ${tokens.colors[theme.mode].accentSecondary};
        }
        `

    if ($hover && $tone === 'secondary')
      return `
        color: ${tokens.colors[theme.mode].textSecondary};
        background-color: ${tokens.colors[theme.mode].foregroundTertiary};
      
        &:hover, &:active {
          color: ${tokens.colors[theme.mode].text};
          background-color: ${tokens.colors[theme.mode].foregroundSecondary};
        }
        `

    if ($hover && $tone === 'blue')
      return `
        &:hover, &:active {
          background-color: rgb(${tokens.colors[theme.mode].blue});
        }
        `

    if ($hover && $tone === 'green')
      return `
        &:hover, &:active {
          background-color: rgb(${tokens.colors[theme.mode].green});
        }
        `

    if ($hover && $tone === 'red')
      return `
        &:hover, &:active {
          background-color: rgb(${tokens.colors[theme.mode].red});
        }
        `
  }}
`

const LabelContainer = styled.label`
  align-items: center;
  border-radius: ${tokens.radii['full']};
  display: flex;
  height: ${tokens.space['full']};
  padding: 0 ${tokens.space['2']};

  ${({ theme }) => `
    box-shadow: 0 0 0 2px ${tokens.colors[theme.mode].background};
  `}
`

const ChildContainer = styled.div`
  padding: 0 ${tokens.space['2']};
`

export type Props = {
  /** Element type of container */
  as?: 'div' | 'span'
  /** Text of optional label element */
  label?: string
  /** If true, changes colors on hover */
  hover?: boolean
  /** Size of element */
  size?: 'small' | 'medium'
  /** Color style of tag */
  tone?: 'accent' | 'blue' | 'green' | 'red' | 'secondary'
}

export const Tag = ({
  as = 'div',
  children,
  hover,
  label,
  size = 'medium',
  tone = 'secondary',
}: React.PropsWithChildren<Props>) => {
  return (
    <Container as={as} {...{ $hover: hover, $size: size, $tone: tone }}>
      {label && (
        <LabelContainer>
          <span>{label}</span>
        </LabelContainer>
      )}
      <ChildContainer as={as}>{children}</ChildContainer>
    </Container>
  )
}
