import * as React from 'react'
import styled, { css } from 'styled-components'

interface ContainerProps {
  $hover?: boolean
  $size: 'small' | 'medium'
  $tone: 'accent' | 'blue' | 'green' | 'secondary' | 'red'
}

const Container = styled.div<ContainerProps>(
  ({ theme, $hover, $size, $tone }) => css`
    line-height: normal;
    align-items: center;
    display: flex;
    border-radius: ${theme.radii['full']};
    font-weight: ${theme.fontWeights['medium']};
    width: ${theme.space['max']};

    ${$hover &&
    css`
      transition-duration: ${theme.transitionDuration['150']};
      transition-property: color, border-color, background-color;
      transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    `}

    ${() => {
      switch ($size) {
        case 'small':
          return css`
            height: ${theme.space['5']};
            font-size: ${theme.fontSizes['label']};
          `
        case 'medium':
          return css`
            height: ${theme.space['6']};
            font-size: ${theme.fontSizes['small']};
          `
        default:
          return ``
      }
    }}

  ${() => {
      switch ($tone) {
        case 'accent':
          return css`
            color: ${theme.colors.accent};
            background-color: ${theme.colors.accentTertiary};
          `
        case 'secondary':
          return css`
            color: ${theme.colors.textTertiary};
            background-color: ${theme.colors.foregroundTertiary};
          `
        case 'blue':
          return css`
            color: ${theme.colors.blue};
            background-color: rgba(
              ${theme.accentsRaw.blue},
              calc(${theme.shades.accentSecondary} * 0.5)
            );
          `
        case 'green':
          return css`
            color: ${theme.colors.green};
            background-color: rgba(
              ${theme.accentsRaw.green},
              calc(${theme.shades.accentSecondary} * 0.5)
            );
          `
        case 'red':
          return css`
            color: ${theme.colors.red};
            background-color: rgba(
              ${theme.accentsRaw.red},
              calc(${theme.shades.accentSecondary} * 0.5)
            );
          `
        default:
          return ``
      }
    }}
  
  ${() => {
      if ($hover && $tone === 'accent')
        return css`
          background-color: ${theme.colors.accentTertiary};

          &:hover,
          &:active {
            background-color: ${theme.colors.accentSecondary};
          }
        `

      if ($hover && $tone === 'secondary')
        return css`
          color: ${theme.colors.textSecondary};
          background-color: ${theme.colors.foregroundTertiary};

          &:hover,
          &:active {
            color: ${theme.colors.text};
            background-color: ${theme.colors.foregroundSecondary};
          }
        `

      if ($hover && $tone === 'blue')
        return css`
          &:hover,
          &:active {
            background-color: ${theme.colors.blue};
          }
        `

      if ($hover && $tone === 'green')
        return css`
          &:hover,
          &:active {
            background-color: ${theme.colors.green};
          }
        `

      if ($hover && $tone === 'red')
        return css`
          &:hover,
          &:active {
            background-color: ${theme.colors.red};
          }
        `
    }}
  `,
)

const LabelContainer = styled.label(
  ({ theme }) => css`
    align-items: center;
    border-radius: ${theme.radii['full']};
    display: flex;
    height: ${theme.space['full']};
    padding: 0 ${theme.space['2']};
    box-shadow: 0 0 0 2px ${theme.colors.background};
  `,
)

const ChildContainer = styled.div(
  ({ theme }) => css`
    padding: 0 ${theme.space['2']};
  `,
)

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

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
} & NativeDivProps

export const Tag = ({
  as = 'div',
  children,
  hover,
  label,
  size = 'medium',
  tone = 'secondary',
  ...props
}: Props) => {
  return (
    <Container {...props} $hover={hover} $size={size} $tone={tone} as={as}>
      {label && (
        <LabelContainer>
          <span>{label}</span>
        </LabelContainer>
      )}
      <ChildContainer as={as}>{children}</ChildContainer>
    </Container>
  )
}

Tag.displayName = 'Tag'
