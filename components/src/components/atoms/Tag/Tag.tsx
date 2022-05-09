import * as React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  hover?: boolean
  size: 'small' | 'medium'
  tone: 'accent' | 'blue' | 'green' | 'secondary' | 'red'
  as?: 'div' | 'span'
}

const Container = styled.div<ContainerProps>`
  ${({ theme }) => `
  line-height: normal;
  align-items: center;
  display: flex;
  border-radius: ${theme.radii['full']};
  font-weight: ${theme.fontWeights['medium']};
  width: ${theme.space['max']};
  `}

  ${({ hover, theme }) =>
    hover &&
    `
      transition-duration: ${theme.transitionDuration['150']};
      transition-property: color, border-color, background-color;
      transition-timing-function: ${theme.transitionTimingFunction['inOut']};
  `}

  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `
          height: ${theme.space['5']};
          font-size: ${theme.fontSizes['label']};
        `
      case 'medium':
        return `
          height: ${theme.space['6']};
          font-size: ${theme.fontSizes['small']};
        `
      default:
        return ``
    }
  }}

  ${({ tone, theme }) => {
    switch (tone) {
      case 'accent':
        return `
          color: ${theme.colors.accent};
          background-color: ${theme.colors.accentTertiary};
        `
      case 'secondary':
        return `
          color: ${theme.colors.textTertiary};
          background-color: ${theme.colors.foregroundTertiary};
        `
      case 'blue':
        return `
          color: ${theme.colors.blue};
          background-color: rgba(${theme.accentsRaw.blue}, calc(${theme.shades.accentSecondary} * 0.5));
        `
      case 'green':
        return `
          color: ${theme.colors.green};
          background-color: rgba(${theme.accentsRaw.green}, calc(${theme.shades.accentSecondary} * 0.5));
        `
      case 'red':
        return `
          color: ${theme.colors.red};
          background-color: rgba(${theme.accentsRaw.red}, calc(${theme.shades.accentSecondary} * 0.5));
        `
      default:
        return ``
    }
  }}
  
  ${({ hover, tone, theme }) => {
    if (hover && tone === 'accent')
      return `
        background-color: ${theme.colors.accentTertiary};
      
        &:hover:active {
        background-color: ${theme.colors.accentSecondary};
        }
        `

    if (hover && tone === 'secondary')
      return `
        color: ${theme.colors.textSecondary};
        background-color: ${theme.colors.foregroundTertiary};
      
        &:hover:active {
          color: ${theme.colors.text};
          background-color: ${theme.colors.foregroundSecondary};
        }
        `

    if (hover && tone === 'blue')
      return `
        &:hover:active {
          background-color: ${theme.colors.blue};
        }
        `

    if (hover && tone === 'green')
      return `
        &:hover:active {
          background-color: ${theme.colors.green};
        }
        `

    if (hover && tone === 'red')
      return `
        &:hover:active {
          background-color: ${theme.colors.red};
        }
        `
  }}
`

const LabelContainer = styled.label`
  ${({ theme }) => `
  align-items: center;
  border-radius: ${theme.radii['full']};
  display: flex;
  height: ${theme.space['full']};
  padding: 0 ${theme.space['2']};
  box-shadow: 0 0 0 2px ${theme.colors.background};
  `}
`

const ChildContainer = styled.div`
  ${({ theme }) => `
  padding: 0 ${theme.space['2']};
  `}
`

export type Props = {
  as?: 'div' | 'span'
  label?: string
  hover?: boolean
  size?: 'small' | 'medium'
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
    <Container as={as} {...{ hover, size, tone }}>
      {label && (
        <LabelContainer>
          <span>{label}</span>
        </LabelContainer>
      )}
      <ChildContainer as={as}>{children}</ChildContainer>
    </Container>
  )
}
