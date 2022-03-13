import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'
import { largerThan } from '@/src/utils/responsiveHelpers'

interface HeadingContainerProps {
  textAlign: React.CSSProperties['textAlign']
  textTransform: React.CSSProperties['textTransform']
  level: '1' | '2'
  responsive?: boolean
}

const HeadingContainer = styled.div<HeadingContainerProps>`
  ${(p) => `
    ${p.textAlign && `text-align: ${p.textAlign};`}
    ${p.textTransform && `text-transform: ${p.textTransform};`}
  `}

  ${(p) => {
    switch (p.level) {
      case '1':
        return `
          font-size: ${tokens.fontSizes.headingOne};
          font-weight: ${tokens.fontWeights.semiBold};
          letter-spacing: -0.02;
          line-height: 4rem;
        `
      case '2':
        return `
          font-size: ${tokens.fontSizes.headingTwo};
          font-weight: ${tokens.fontWeights.semiBold};
          letter-spacing: -0.02;
          line-height: 2.5rem;
        `
      default:
        return ``
    }
  }}
  
  ${(p) => {
    if (p.responsive) {
      switch (p.level) {
        case '1':
          return `
          font-size: ${tokens.fontSizes.headingTwo};
          
          ${largerThan.sm`
            font-size: ${tokens.fontSizes.headingOne};
          `}
        `
        case '2':
          return `
          font-size: ${tokens.fontSizes.extraLarge};
          letter-spacing: normal;
          
          ${largerThan.sm`
            font-size: ${tokens.fontSizes.headingTwo};
            letter-spacing: -0.02;
          `}
        `
        default:
          return ``
      }
    }
  }}
  
  font-family: sans;
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

export const Heading = ({
  align,
  children,
  as = 'h1',
  color = 'foreground',
  id,
  level = '2',
  responsive,
  transform,
}: Props) => {
  return (
    <HeadingContainer
      as={as}
      color={color}
      id={id}
      textAlign={align}
      textTransform={transform}
      {...{
        level,
        responsive,
      }}
    >
      {children}
    </HeadingContainer>
  )
}
