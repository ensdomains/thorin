import * as React from 'react'
import styled from 'styled-components'

import { largerThan } from '@/src/utils/responsiveHelpers'

interface HeadingContainerProps {
  textAlign: React.CSSProperties['textAlign']
  textTransform: React.CSSProperties['textTransform']
  level: '1' | '2'
  responsive?: boolean
}

const HeadingContainer = styled.div<HeadingContainerProps>`
  ${({ textAlign, textTransform }) => `
    ${textAlign ? `text-align: ${textAlign};` : ``}
    ${textTransform ? `text-transform: ${textTransform};` : ``}
  `}

  ${({ level, theme }) => {
    switch (level) {
      case '1':
        return `
          font-size: ${theme.fontSizes.headingOne};
          font-weight: ${theme.fontWeights.semiBold};
          letter-spacing: ${theme.letterSpacings['-0.02']};
          line-height: 4rem;
        `
      case '2':
        return `
          font-size: ${theme.fontSizes.headingTwo};
          font-weight: ${theme.fontWeights.semiBold};
          letter-spacing: ${theme.letterSpacings['-0.02']};
          line-height: 2.5rem;
        `
      default:
        return ``
    }
  }}
  
  ${({ responsive, level, theme }) => {
    if (responsive) {
      switch (level) {
        case '1':
          return [
            `
          font-size: ${theme.fontSizes.headingTwo};
          `,
            largerThan.sm`
            font-size: ${theme.fontSizes.headingOne};
          `,
          ]
        case '2':
          return [
            `
          font-size: ${theme.fontSizes.extraLarge};
          letter-spacing: normal;
          `,
            largerThan.sm`
            font-size: ${theme.fontSizes.headingTwo};
            letter-spacing: -0.02;
          `,
          ]
        default:
          return ``
      }
    }
  }}
  
  font-family: ${({ theme }) => theme.fonts['sans']};
`

type Props = {
  align?: React.CSSProperties['textAlign']
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'legend'
  children?: React.ReactNode
  color?: string
  id?: string
  transform?: React.CSSProperties['textTransform']
  responsive?: boolean
  level?: '1' | '2'
}

export const Heading = React.forwardRef(
  (
    {
      align,
      children,
      as = 'h1',
      id,
      level = '2',
      responsive,
      transform,
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <HeadingContainer
      textAlign={align}
      textTransform={transform}
      {...{
        level,
        responsive,
        as,
        id,
        ref,
      }}
    >
      {children}
    </HeadingContainer>
  ),
)
