import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'

type Shape = 'circle' | 'square'

interface Container {
  shape: Shape
  noBorder?: boolean
  size: string
}

const Container = styled.div<Container>`
  ${(p) => {
    switch (p.shape) {
      case 'circle':
        return `
          borderRaduis: ${tokens.radii.full};
          &:after {
            borderRaduis: ${tokens.radii.full};
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

  ${(p) =>
    !p.noBorder &&
    `
      &:after {
        box-shadow: ${tokens.shadows['-px']} ${
      tokens.shades[p.theme.mode].foregroundTertiary
    };
      }      
  `}

  ${(p) =>
    `
      height: ${p.size}px;
      width: ${p.size}px;
      minWidth: ${p.size}px;
      background-color: ${tokens.shades[p.theme.mode].foregroundSecondary};
  `}
  
  overflow: hidden;
  position: relative;
  height: 100%;
`

const Placeholder = styled.div`
  ${(p) => `
    background: ${tokens.colors[p.theme.mode].gradients.blue};
  `}

  display: flex;
  align-items: center;
  justify-content: center;
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
  size?: string
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
