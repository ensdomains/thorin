import * as React from 'react'
import styled from 'styled-components'

import { Space, tokens } from '@/src/tokens'

type Shape = 'circle' | 'square'

interface Container {
  shape: Shape
  noBorder?: boolean
  size: Space
}

const Container = styled.div<Container>`
  ${({ shape }) => {
    switch (shape) {
      case 'circle':
        return `
          border-radius: ${tokens.radii.full};
          &:after {
            border-radius: ${tokens.radii.full};
          }
        `
      case 'square':
        return `
          border-radius: ${tokens.radii['2xLarge']}
          &:after {
            border-radius: ${tokens.radii['2xLarge']}
          }
        `
      default:
        return ``
    }
  }}

  ${({ theme, noBorder }) =>
    !noBorder &&
    `
      &:after {
      box-shadow: ${tokens.shadows['-px']} ${
      tokens.colors[theme.mode].foregroundTertiary
    };
    content: '';
    inset: 0;
    position: absolute;
      }   
      }      
  `}

  ${({ theme, size }) =>
    `
      height: ${tokens.space[size]};
      width: ${tokens.space[size]};
      min-width: ${tokens.space[size]};
      background-color: ${tokens.colors[theme.mode].foregroundSecondary};
      
       
  `}
  
  overflow: hidden;
  position: relative;
`

const Placeholder = styled.div`
  ${({ theme }) => `
    background: ${tokens.colors[theme.mode].gradients.blue};
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

export type Props = {
  as?: 'img' | React.ComponentType
  label: string
  placeholder?: boolean
  noBorder?: boolean
  size?: Space
  src?: string
  shape?: Shape
}

export const Avatar = ({
  label,
  placeholder,
  noBorder,
  shape = 'circle',
  size = '12',
  src,
}: Props) => {
  return (
    <Container {...{ shape, size, noBorder: placeholder || noBorder }}>
      {placeholder ? (
        <Placeholder aria-label={label} />
      ) : (
        <Img
          {...{
            decoding: 'async',
            src: src,
            alt: label,
          }}
        />
      )}
    </Container>
  )
}
