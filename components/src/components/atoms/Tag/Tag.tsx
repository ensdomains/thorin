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
        case 'blue':
        case 'green':
        case 'red':
          return css`
            color: ${theme.colors[$tone]};
            background-color: ${theme.colors[`${$tone}Surface`]};
          `
        case 'secondary':
          return css`
            color: ${theme.colors.textTertiary};
            background-color: ${theme.colors.greySurface};
          `
        default:
          return ``
      }
    }}
  
  ${() => {
      if ($hover && $tone === 'secondary')
        return css`
          color: ${theme.colors.textSecondary};
          background-color: ${theme.colors.greySurface};

          &:hover,
          &:active {
            color: ${theme.colors.text};
            background-color: ${theme.colors.greyBright};
          }
        `
      if ($hover && $tone !== 'secondary')
        return css`
          &:hover,
          &:active {
            background-color: ${theme.colors[`${$tone}Bright`]};
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
